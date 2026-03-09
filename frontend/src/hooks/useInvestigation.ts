// frontend/src/hooks/useInvestigation.ts
import { useState } from 'react'

interface Investigation {
  id: string
  service: string
  status: 'investigating' | 'complete' | 'failed'
  createdAt: string
  completedAt?: string
  analysis?: {
    rootCause: string
    startTime: string
    errorCount: number
    affectedComponent: string
    recommendation: string
    confidence: number
    errorPattern?: string
    firstOccurrence?: string
  }
  rawLogs?: Array<{
    timestamp: string
    level: string
    service: string
    message: string
    stackTrace?: string
  }>
  error?: string
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export function useInvestigation() {
  const [isInvestigating, setIsInvestigating] = useState(false)
  const [investigation, setInvestigation] = useState<Investigation | null>(null)
  const [error, setError] = useState<string | null>(null)

  const startInvestigation = async (service: string) => {
    setIsInvestigating(true)
    setError(null)
    setInvestigation(null)

    try {
      console.log('🚀 Starting investigation for:', service)
      
      // Step 1: Start investigation
      const startRes = await fetch(`${API_BASE_URL}/investigate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service })
      })

      if (!startRes.ok) {
        throw new Error('Failed to start investigation')
      }

      const { investigationId } = await startRes.json()
      console.log('✅ Investigation started:', investigationId)

      // Step 2: Poll for results
      let attempts = 0
      const maxAttempts = 30 // 30 seconds max

      const pollResults = async (): Promise<void> => {
        attempts++
        console.log(`🔄 Polling attempt ${attempts}/${maxAttempts}`)

        const res = await fetch(`${API_BASE_URL}/investigate/${investigationId}`)
        const data: Investigation = await res.json()

        console.log('📊 Investigation status:', data.status)
        setInvestigation(data)

        if (data.status === 'investigating' && attempts < maxAttempts) {
          setTimeout(pollResults, 1000) // Poll every second
        } else {
          setIsInvestigating(false)
          if (data.status === 'complete') {
            console.log('✅ Investigation complete!')
          }
        }
      }

      await pollResults()

    } catch (err) {
      console.error('❌ Investigation error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setIsInvestigating(false)
    }
  }

  const reset = () => {
    setInvestigation(null)
    setError(null)
    setIsInvestigating(false)
  }

  return {
    investigation,
    isInvestigating,
    error,
    startInvestigation,
    reset
  }
}