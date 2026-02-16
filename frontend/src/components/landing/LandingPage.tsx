import AnimatedBackground from '../shared/AnimatedBackground'
import LandingNavbar from './LandingNavbar'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import Footer from './Footer'

interface LandingPageProps {
  onSignIn: () => void
  onSignUp: () => void
}

export default function LandingPage({ onSignIn, onSignUp }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <LandingNavbar onSignIn={onSignIn} onSignUp={onSignUp} />

      <main className="relative z-10">
        <HeroSection onGetStarted={onSignUp} />
        <FeaturesSection />
        <StatsSection />
        <CTASection onGetStarted={onSignUp} />
      </main>

      <Footer />
    </div>
  )
}

