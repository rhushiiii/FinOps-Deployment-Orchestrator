import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import db from "../db/database.js";
import { config } from "../config.js";
import { authenticate, AuthRequest } from "../middleware/auth.js";

interface UserRow {
  id: string;
  name: string;
  email: string;
  hashed_password: string;
  created_at: string;
}

const router = Router();

// POST /api/v1/auth/register
router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Name, email, and password are required" });
    return;
  }

  const existing = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(email) as UserRow | undefined;

  if (existing) {
    res
      .status(409)
      .json({ error: "A user with this email already exists" });
    return;
  }

  const id = crypto.randomUUID();
  const hashedPassword = await bcrypt.hash(password, 10);

  db.prepare(
    "INSERT INTO users (id, name, email, hashed_password) VALUES (?, ?, ?, ?)"
  ).run(id, name, email, hashedPassword);

  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as UserRow;

  const token = jwt.sign({ sub: user.id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

  res.status(201).json({
    access_token: token,
    token_type: "bearer",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    },
  });
});

// POST /api/v1/auth/login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const user = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as UserRow | undefined;

  if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
    res.status(401).json({ error: "Incorrect email or password" });
    return;
  }

  const token = jwt.sign({ sub: user.id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

  res.json({
    access_token: token,
    token_type: "bearer",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    },
  });
});

// GET /api/v1/auth/me
router.get("/me", authenticate, (req: AuthRequest, res: Response) => {
  const user = db
    .prepare("SELECT id, name, email, created_at FROM users WHERE id = ?")
    .get(req.userId!) as Omit<UserRow, "hashed_password"> | undefined;

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
});

export default router;
