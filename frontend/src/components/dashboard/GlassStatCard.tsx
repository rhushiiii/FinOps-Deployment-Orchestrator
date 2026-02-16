import { StatCardProps } from '../../types'

export default function GlassStatCard({ icon: Icon, value, label, change, changeColor = 'text-green-400' }: StatCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
      
      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all">
        <div className="flex items-start justify-between mb-6">
          <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Icon className="w-7 h-7 text-blue-400" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-semibold ${changeColor}`}>
            {change}
          </div>
        </div>
        <div className="text-4xl font-bold mb-2">{value}</div>
        <div className="text-sm text-gray-500 font-medium">{label}</div>
      </div>
    </div>
  )
}

