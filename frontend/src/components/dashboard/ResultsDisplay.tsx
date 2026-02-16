import { AlertCircle, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import TimelineEvent from './TimelineEvent'
import { TIMELINE_EVENTS } from '../../utils/constants'

export default function ResultsDisplay() {
  return (
    <div className="space-y-6">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl opacity-20 blur" />
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-red-500/20 p-10">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-7 h-7 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-3 text-red-400">Root Cause Identified</h3>
              <p className="text-gray-300 text-lg mb-5">
                NullPointerException in <code className="px-3 py-1 bg-white/5 rounded-lg text-blue-400 font-mono border border-white/10">PaymentController.java:127</code>
              </p>
              <div className="flex items-center gap-8 text-sm text-gray-500 font-medium">
                <span>First occurrence: 10:42:15 UTC</span>
                <span>•</span>
                <span>23 errors in last 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl opacity-20 blur" />
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-green-500/20 p-10">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-7 h-7 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-3 text-green-400">Recommended Action</h3>
              <p className="text-gray-300 text-lg mb-5">
                ROLLBACK to version v2.3.0
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Recent deployment (v2.3.1 at 10:40 UTC) introduced null validation bug in payment processing logic.
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl font-semibold transition-all flex items-center gap-3 shadow-lg hover:shadow-green-500/30">
                <span>Execute Rollback</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 blur" />
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10">
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
            <Clock className="w-7 h-7 text-blue-400" />
            Event Timeline
          </h3>
          <div className="space-y-5">
            {TIMELINE_EVENTS.map((event, index) => (
              <TimelineEvent key={index} {...event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

