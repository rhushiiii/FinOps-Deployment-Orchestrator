// backend/src/agents/LogsAgents.ts
import { StateGraph, Annotation, END, START } from '@langchain/langgraph'
import { ClaudeService } from '../services/ClaudeService'
import { Investigation, LogAnalysis, LogEntry } from '../utils/types.js'
import { generateRealisticLogs } from '../utils/mockData.js'

// --- Graph State ---
const GraphState = Annotation.Root({
  service:         Annotation<string>,
  investigationId: Annotation<string>,
  createdAt:       Annotation<string>,
  logs:            Annotation<LogEntry[]>,
  analysis:        Annotation<LogAnalysis | undefined>,
  error:           Annotation<string | undefined>,
})

type GraphStateType = typeof GraphState.State

// --- Shared Claude service ---
const claudeService = new ClaudeService()

// --- Nodes ---
async function fetchLogsNode(state: GraphStateType) {
  console.log(`📋 [${state.investigationId}] Fetching logs...`)
  const logs = generateRealisticLogs(state.service)
  return { logs }
}

async function analyzeLogsNode(state: GraphStateType) {
  console.log(`🤖 [${state.investigationId}] Analyzing with Claude AI...`)
  const analysis = await claudeService.analyzeLogs(state.logs, state.service)
  return { analysis }
}

function finalizeNode(state: GraphStateType) {
  console.log(`✅ [${state.investigationId}] Investigation complete`)
  return {}
}

// --- Conditional routing after fetchLogs ---
function routeAfterFetch(state: GraphStateType): string {
  const hasErrors = state.logs.some(l => l.level === 'ERROR')
  return hasErrors ? 'analyzeLogs' : 'finalize'
}

// --- Compiled investigation graph ---
const investigationGraph = new StateGraph(GraphState)
  .addNode('fetchLogs',   fetchLogsNode)
  .addNode('analyzeLogs', analyzeLogsNode)
  .addNode('finalize',    finalizeNode)
  .addEdge(START, 'fetchLogs')
  .addConditionalEdges('fetchLogs', routeAfterFetch)
  .addEdge('analyzeLogs', 'finalize')
  .addEdge('finalize', END)
  .compile()

// --- Agent class (public API unchanged) ---
export class LogsAgent {
  private investigations = new Map<string, Investigation>()

  async investigate(service: string, investigationId: string): Promise<void> {
    console.log(`🔍 [${investigationId}] Starting investigation for ${service}`)

    const createdAt = new Date().toISOString()

    this.investigations.set(investigationId, {
      id: investigationId,
      service,
      status: 'investigating',
      createdAt,
    })

    try {
      const result = await investigationGraph.invoke({
        service,
        investigationId,
        createdAt,
        logs:     [],
        analysis: undefined,
        error:    undefined,
      })

      this.investigations.set(investigationId, {
        id: investigationId,
        service,
        status: 'complete',
        createdAt,
        completedAt: new Date().toISOString(),
        analysis:    result.analysis,
        rawLogs:     result.logs
          .filter((l: LogEntry) => l.level === 'ERROR')
          .slice(0, 5),
      })
    } catch (error: any) {
      console.error(`❌ [${investigationId}] Investigation failed:`, error)

      this.investigations.set(investigationId, {
        id: investigationId,
        service,
        status: 'failed',
        createdAt,
        completedAt: new Date().toISOString(),
        error: error.message,
      })
    }
  }

  getInvestigation(id: string): Investigation | undefined {
    return this.investigations.get(id)
  }

  getAllInvestigations(): Investigation[] {
    return Array.from(this.investigations.values())
  }
}
