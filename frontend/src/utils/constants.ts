import { 
  Zap, Activity, TrendingUp, Shield, Clock, CheckCircle 
} from 'lucide-react'
import { FeatureProps, StatProps } from '../types'

export const FEATURES: FeatureProps[] = [
  {
    icon: Zap,
    title: "2-Minute Resolution",
    description: "From incident detection to remediation plan in under 2 minutes. 93% faster than manual investigation."
  },
  {
    icon: Activity,
    title: "AI-Powered Analysis",
    description: "Claude Sonnet 4 analyzes logs, metrics, and deployment history to identify root causes automatically."
  },
  {
    icon: TrendingUp,
    title: "Cost Optimization",
    description: "Detect over-provisioned resources and automatically scale down post-incident, saving $450/day per service."
  },
  {
    icon: Shield,
    title: "Compliance Ready",
    description: "Built-in compliance checks ensure rollbacks and fixes don't violate SOC2, HIPAA, or security policies."
  },
  {
    icon: Clock,
    title: "Predictive Prevention",
    description: "ML models learn from past incidents to predict and prevent issues 15-30 minutes before they occur."
  },
  {
    icon: CheckCircle,
    title: "Auto-Resolution",
    description: "80% of incidents are automatically resolved without human intervention through smart remediation workflows."
  }
]

export const STATS: StatProps[] = [
  { value: "2m 14s", label: "Average Resolution Time", change: "-93%" },
  { value: "98.4%", label: "AI Accuracy Rate", change: "+2.1%" },
  { value: "$164k", label: "Annual Savings/Service", change: "+$12k" },
  { value: "80%", label: "Auto-Resolved Incidents", change: "+15%" }
]

export const RECENT_SERVICES = [
  { name: 'checkout-service', status: 'healthy' as const, lastCheck: '2m ago' },
  { name: 'auth-provider', status: 'warning' as const, lastCheck: '5m ago' },
  { name: 'notification-worker', status: 'healthy' as const, lastCheck: '1m ago' },
]

export const LOADING_STAGES = [
  { label: 'Fetching logs from Elasticsearch', progress: 100 },
  { label: 'Analyzing with Claude AI', progress: 60 },
  { label: 'Generating recommendations', progress: 20 },
]

export const TIMELINE_EVENTS = [
  { time: "10:40:00", event: "Deployment v2.3.1 started", type: "info" as const },
  { time: "10:42:15", event: "First NullPointerException detected", type: "error" as const },
  { time: "10:45:30", event: "Error rate spike (23 errors/min)", type: "critical" as const },
  { time: "10:47:00", event: "Investigation triggered", type: "info" as const },
]
