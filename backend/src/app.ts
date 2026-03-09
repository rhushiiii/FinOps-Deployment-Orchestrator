// backend/src/app.ts
import express, { Request, Response } from 'express'
import cors from 'cors'
import { investigationRouter } from './routes/investigations'

export function createApp() {
  const app = express()

  // Middleware - UPDATED CORS
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  }))
  app.use(express.json())

  // Routes
  app.use('/api', investigationRouter)

  // Health check
  app.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'devops-orchestrator',
      timestamp: new Date().toISOString()
    })
  })

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: 'Not found',
      path: req.path
    })
  })

  return app
}