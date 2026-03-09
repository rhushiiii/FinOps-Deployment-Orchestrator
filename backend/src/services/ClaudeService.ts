// backend/src/services/ClaudeService.ts
import Anthropic from '@anthropic-ai/sdk'
import { LogAnalysis, LogEntry } from '../utils/types.js'

export class ClaudeService {
  private _anthropic: Anthropic | null = null

  private get anthropic(): Anthropic {
    if (!this._anthropic) {
      this._anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    }
    return this._anthropic
  }

  async analyzeLogs(logs: LogEntry[], service: string): Promise<LogAnalysis> {
    const errorLogs = logs.filter(log => log.level === 'ERROR')
    
    if (errorLogs.length === 0) {
      return {
        rootCause: 'No errors detected',
        startTime: new Date().toISOString(),
        errorCount: 0,
        affectedComponent: service,
        recommendation: 'System appears healthy',
        confidence: 100
      }
    }

    const logContext = errorLogs
      .slice(0, 10)
      .map(log => `[${log.timestamp}] ${log.level}: ${log.message}\n${log.stackTrace || ''}`)
      .join('\n\n---\n\n')

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        temperature: 0.3,
        messages: [{
          role: 'user',
          content: `You are a senior DevOps engineer analyzing production logs for incident response.

Service: ${service}
Total Errors: ${errorLogs.length}

Error Logs:
${logContext}

Analyze these logs and provide a structured response in the following JSON format:
{
  "rootCause": "Specific root cause (be precise about error type and location)",
  "startTime": "ISO timestamp of first error",
  "errorCount": ${errorLogs.length},
  "affectedComponent": "Specific component/class/method affected",
  "recommendation": "Specific actionable recommendation (e.g., 'Rollback to v2.3.0' or 'Fix null validation in PaymentController.java:127')",
  "confidence": 85,
  "errorPattern": "Description of error pattern observed",
  "firstOccurrence": "When this error type was first seen"
}

IMPORTANT:
- Be specific and technical
- Identify the exact code location if mentioned in stack traces
- Provide actionable recommendations
- Confidence should be 0-100 based on log clarity
- Return ONLY valid JSON, no markdown formatting`
        }]
      })

      const content = response.content[0]
      const analysisText = content.type === 'text' ? content.text : ''
      
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('Claude did not return valid JSON')
      }

      const analysis: LogAnalysis = JSON.parse(jsonMatch[0])

      return {
        rootCause: analysis.rootCause || 'Unknown error',
        startTime: analysis.startTime || new Date().toISOString(),
        errorCount: analysis.errorCount || errorLogs.length,
        affectedComponent: analysis.affectedComponent || service,
        recommendation: analysis.recommendation || 'Investigate further',
        confidence: Math.min(100, Math.max(0, analysis.confidence || 70)),
        errorPattern: analysis.errorPattern,
        firstOccurrence: analysis.firstOccurrence
      }
    } catch (error: any) {
      console.error('Claude API Error:', error)
      
      return {
        rootCause: 'Failed to analyze with AI - see raw logs',
        startTime: new Date().toISOString(),
        errorCount: errorLogs.length,
        affectedComponent: service,
        recommendation: 'Manual investigation required',
        confidence: 50
      }
    }
  }
}
