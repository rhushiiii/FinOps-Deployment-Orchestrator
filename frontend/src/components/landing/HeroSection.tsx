import { ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  onGetStarted: () => void
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="px-8 lg:px-12 pt-32 lg:pt-36 pb-24">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
          <span className="text-white">Resolve Incidents in</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Minutes, Not Hours
          </span>
        </h1>

        <p className="mt-8 text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          FinOps combines FinOps and DevOps intelligence to detect root causes, recommend remediations, and cut cloud spend automatically.
        </p>

        <div className="mt-10 flex items-center justify-center">
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center gap-3"
          >
            <span>Start Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

