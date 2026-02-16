import { useState } from 'react'
import { Search, ArrowRight, Clock, Activity, TrendingUp, Sparkles } from 'lucide-react'
import AnimatedBackground from '../shared/AnimatedBackground'
import GlassNavbar from './GlassNavbar'
import GlassStatCard from './GlassStatCard'
import LoadingState from './LoadingState'
import ResultsDisplay from './ResultsDisplay'
import RecentServices from './RecentServices'

export default function ProfessionalDashboard() {
  const [serviceName, setServiceName] = useState('')
  const [isInvestigating, setIsInvestigating] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleInvestigate = async () => {
    setIsInvestigating(true)
    setTimeout(() => {
      setIsInvestigating(false)
      setShowResults(true)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <GlassNavbar />

      <main className="relative z-10 pt-24">
        <div className="px-8 lg:px-12 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-10">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500" />
                <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                  <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    AI-Powered Log Analysis
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-8 mb-16">
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tight leading-none">
                <span className="text-white">FinOps DevOps</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block mt-2">
                  Orchestrator
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Investigate incidents, analyze root causes, and get remediation plans in seconds using FinOps & Claude.
              </p>
            </div>

            <div className="mb-20">
              <div className="relative group max-w-4xl mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500" />
                
                <div className="relative flex items-center bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                  <Search className="w-6 h-6 text-gray-500 ml-8" />
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="Enter service name (e.g., payment-service)"
                    className="flex-1 bg-transparent px-6 py-6 text-lg outline-none placeholder:text-gray-600"
                    onKeyPress={(e) => e.key === 'Enter' && handleInvestigate()}
                  />
                  <button
                    onClick={handleInvestigate}
                    disabled={!serviceName || isInvestigating}
                    className="m-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 group/btn relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                    
                    {isInvestigating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="relative">Investigating...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative">Investigate</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform relative" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <GlassStatCard
                icon={Clock}
                value="2m 14s"
                label="Avg Resolution"
                change="-85%"
                changeColor="text-blue-400"
              />
              <GlassStatCard
                icon={Activity}
                value="98.4%"
                label="AI Accuracy"
                change="+2.1%"
                changeColor="text-green-400"
              />
              <GlassStatCard
                icon={TrendingUp}
                value="$12.4k"
                label="Cost Saved"
                change="+$1.2k"
                changeColor="text-green-400"
              />
            </div>

            {isInvestigating && <LoadingState />}
            {showResults && <ResultsDisplay />}
          </div>
        </div>

        <RecentServices />
      </main>
    </div>
  )
}

