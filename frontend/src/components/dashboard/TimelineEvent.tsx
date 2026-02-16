import { TimelineEventProps } from '../../types'

export default function TimelineEvent({ time, event, type }: TimelineEventProps) {
  const colors = {
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    error: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    critical: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  return (
    <div className="flex items-center gap-6">
      <span className="text-sm text-gray-500 font-mono w-24 flex-shrink-0">{time}</span>
      <div className={`flex-1 px-6 py-4 rounded-xl border ${colors[type]} backdrop-blur-xl font-medium`}>
        {event}
      </div>
    </div>
  )
}

