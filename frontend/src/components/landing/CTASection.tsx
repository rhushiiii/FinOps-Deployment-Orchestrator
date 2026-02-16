import { ArrowRight } from 'lucide-react'

interface CTASectionProps {
  onGetStarted: () => void
}

export default function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="px-8 lg:px-12 py-20">
      <div className="max-w-5xl mx-auto relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-30 blur transition duration-500" />
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Modernize Incident Response?
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
            Start with FinOps today and let AI investigate production incidents while your team focuses on shipping features.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center gap-3 mx-auto"
          >
            <span>Create Account</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

