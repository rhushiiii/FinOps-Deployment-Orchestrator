// backend/src/utils/types.ts
export interface LogEntry {
  timestamp: string
  level: 'ERROR' | 'WARN' | 'INFO'
  service: string
  message: string
  stackTrace?: string
  userId?: string
  requestId?: string
}

export interface LogAnalysis {
  rootCause: string
  startTime: string
  errorCount: number
  affectedComponent: string
  recommendation: string
  confidence: number
  errorPattern?: string
  firstOccurrence?: string
}

export interface Investigation {
  id: string
  service: string
  status: 'investigating' | 'complete' | 'failed'
  createdAt: string
  completedAt?: string
  analysis?: LogAnalysis
  error?: string
  rawLogs?: LogEntry[]
}

export interface InvestigationRequest {
  service: string
  timeRange?: string
  severity?: 'low' | 'medium' | 'high' | 'critical'
}