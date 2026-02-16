import { GitBranch, ChevronRight } from 'lucide-react'
import { RECENT_SERVICES } from '../../utils/constants'

export default function RecentServices() {
  return (
    <div className="px-8 lg:px-12 pb-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
          <GitBranch className="w-7 h-7 text-gray-400" />
          <span>Recent Services</span>
        </h2>
        <div className="space-y-4">
          {RECENT_SERVICES.map((service) => (
            <button
              key={service.name}
              className="w-full group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 blur transition duration-500" />
              <div className="relative flex items-center justify-between px-8 py-5 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center gap-5">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    service.status === 'healthy' ? 'bg-green-500' : 'bg-orange-500'
                  } animate-pulse`} />
                  <span className="font-mono text-gray-300 font-medium">{service.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm text-gray-500 font-medium">{service.lastCheck}</span>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

