// backend/src/cli.ts
import dotenv from 'dotenv'
import { LogsAgent } from './agents/LogsAgents'

dotenv.config({ override: true })

const logsAgent = new LogsAgent()
const service = process.argv[2] || 'payment-service'

console.log(`🔍 Investigating ${service}...\n`)

const investigationId = `cli_${Date.now()}_${service}`

logsAgent.investigate(service, investigationId).then(() => {
  const result = logsAgent.getInvestigation(investigationId)
  
  if (!result) {
    console.log('❌ Investigation failed')
    return
  }

  console.log('╔════════════════════════════════════════════════════════╗')
  console.log('║  INVESTIGATION RESULTS                                ║')
  console.log('╚════════════════════════════════════════════════════════╝\n')
  
  if (result.analysis) {
    console.log('🔴 ROOT CAUSE:')
    console.log(`   ${result.analysis.rootCause}\n`)
    
    console.log('💡 RECOMMENDATION:')
    console.log(`   ${result.analysis.recommendation}\n`)
    
    console.log('📊 STATS:')
    console.log(`   Error Count: ${result.analysis.errorCount}`)
    console.log(`   Confidence: ${result.analysis.confidence}%`)
    console.log(`   Component: ${result.analysis.affectedComponent}\n`)
    
    if (result.rawLogs && result.rawLogs.length > 0) {
      console.log('📋 SAMPLE ERRORS:')
      result.rawLogs.slice(0, 3).forEach((log, i) => {
        console.log(`   ${i + 1}. [${log.timestamp}] ${log.message}`)
      })
    }
  }
  
  console.log('\n✅ Investigation complete!')
  process.exit(0)
})