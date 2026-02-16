import { STATS } from '../../utils/constants'

export default function StatsSection() {
  return (
    <section className="px-8 lg:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium mb-3">{stat.label}</div>
                <div className="text-sm font-semibold text-green-400">{stat.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

