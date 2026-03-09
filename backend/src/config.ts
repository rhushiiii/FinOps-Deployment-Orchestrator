import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "8000", 10),
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-in-production",
  jwtExpiresIn: "24h",
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
};
