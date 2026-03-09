import { Router, Response } from "express";
import crypto from "crypto";
import db from "../db/database.js";
import { authenticate, AuthRequest } from "../middleware/auth.js";

interface ServiceRow {
  id: string;
  name: string;
  status: string;
  environment: string;
  current_version: string;
  last_checked: string;
  owner_id: string;
  created_at: string;
}

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/v1/services
router.get("/", (req: AuthRequest, res: Response) => {
  const services = db
    .prepare("SELECT * FROM services WHERE owner_id = ? ORDER BY created_at DESC")
    .all(req.userId!) as ServiceRow[];

  res.json(services);
});

// POST /api/v1/services
router.post("/", (req: AuthRequest, res: Response) => {
  const { name, environment = "production", current_version = "v1.0.0" } = req.body;

  if (!name) {
    res.status(400).json({ error: "Service name is required" });
    return;
  }

  const id = crypto.randomUUID();
  db.prepare(
    "INSERT INTO services (id, name, environment, current_version, owner_id) VALUES (?, ?, ?, ?, ?)"
  ).run(id, name, environment, current_version, req.userId!);

  const service = db
    .prepare("SELECT * FROM services WHERE id = ?")
    .get(id) as ServiceRow;

  res.status(201).json(service);
});

// GET /api/v1/services/:id
router.get("/:id", (req: AuthRequest, res: Response) => {
  const service = db
    .prepare("SELECT * FROM services WHERE id = ? AND owner_id = ?")
    .get(req.params.id, req.userId!) as ServiceRow | undefined;

  if (!service) {
    res.status(404).json({ error: "Service not found" });
    return;
  }

  res.json(service);
});

// PATCH /api/v1/services/:id
router.patch("/:id", (req: AuthRequest, res: Response) => {
  const service = db
    .prepare("SELECT * FROM services WHERE id = ? AND owner_id = ?")
    .get(req.params.id, req.userId!) as ServiceRow | undefined;

  if (!service) {
    res.status(404).json({ error: "Service not found" });
    return;
  }

  const { name, status, environment, current_version } = req.body;
  const updates: string[] = [];
  const values: unknown[] = [];

  if (name !== undefined) {
    updates.push("name = ?");
    values.push(name);
  }
  if (status !== undefined) {
    updates.push("status = ?");
    values.push(status);
  }
  if (environment !== undefined) {
    updates.push("environment = ?");
    values.push(environment);
  }
  if (current_version !== undefined) {
    updates.push("current_version = ?");
    values.push(current_version);
  }

  updates.push("last_checked = datetime('now')");
  values.push(req.params.id, req.userId!);

  db.prepare(
    `UPDATE services SET ${updates.join(", ")} WHERE id = ? AND owner_id = ?`
  ).run(...values);

  const updated = db
    .prepare("SELECT * FROM services WHERE id = ?")
    .get(req.params.id) as ServiceRow;

  res.json(updated);
});

// DELETE /api/v1/services/:id
router.delete("/:id", (req: AuthRequest, res: Response) => {
  const result = db
    .prepare("DELETE FROM services WHERE id = ? AND owner_id = ?")
    .run(req.params.id, req.userId!);

  if (result.changes === 0) {
    res.status(404).json({ error: "Service not found" });
    return;
  }

  res.status(204).send();
});

export default router;
