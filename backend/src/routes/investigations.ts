// backend/src/routes/investigation.ts
import { Router } from 'express'
import { LogsAgent } from '../agents/LogsAgents.js'
import { InvestigationRequest } from '../utils/types.js'

export const investigationRouter = Router()
const logsAgent = new LogsAgent()

// POST /api/investigate - Start investigation
investigationRouter.post('/investigate', async (req, res) => {
  try {
    const { service, timeRange = '5m', severity = 'high' } = req.body as InvestigationRequest

    if (!service) {
      return res.status(400).json({
        error: 'Missing required field: service',
        message: 'Please provide a service name to investigate'
      })
    }

    const investigationId = `inv_${Date.now()}_${service}`

    // Start investigation asynchronously
    logsAgent.investigate(service, investigationId)
      .catch(err => console.error('Investigation error:', err))

    res.status(202).json({
      message: `Investigation started for ${service}`,
      investigationId,
      service,
      status: 'investigating',
      estimatedTime: '2-3 minutes'
    })
  } catch (error: any) {
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    })
  }
})

// GET /api/investigate/:id - Get investigation results
investigationRouter.get('/investigate/:id', (req, res) => {
  const { id } = req.params
  const investigation = logsAgent.getInvestigation(id)

  if (!investigation) {
    return res.status(404).json({
      error: 'Investigation not found',
      investigationId: id
    })
  }

  res.json(investigation)
})

// GET /api/investigations - Get all investigations
investigationRouter.get('/investigations', (req, res) => {
  const investigations = logsAgent.getAllInvestigations()
  res.json({ investigations })
})