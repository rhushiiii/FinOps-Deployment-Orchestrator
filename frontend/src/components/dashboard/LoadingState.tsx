import { Search, Sparkles, CheckCircle } from 'lucide-react'
import { LOADING_STAGES } from '../../utils/constants'

export default function LoadingState() {
  const stageIcons = [Search, Sparkles, CheckCircle]

  return (
    <div className="relative group mb-16">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 blur transition duration-500" />
      
      <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-semibold">Investigating payment-service</h3>
          <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm text-blue-400 font-medium">In Progress</span>
          </div>
        </div>

        <div className="space-y-8">
          {LOADING_STAGES.map((stage, i) => {
            const Icon = stageIcons[i]
            return (
              <div key={i} className="space-y-4">
                <div className="flex items-center gap-4">
                  <Icon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300 font-medium">{stage.label}</span>
                </div>
                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-1000"
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

