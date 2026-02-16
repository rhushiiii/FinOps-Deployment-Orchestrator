import { useEffect, useState } from 'react'
import { LogOut } from 'lucide-react'
import LandingPage from './components/landing/LandingPage'
import ProfessionalDashboard from './components/dashboard/ProfessionalDashboard'
import AuthModal from './components/auth/AuthModal'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem('finops-auth-user')))
  }, [])

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleCloseModal = () => {
    setShowAuthModal(false)
    setIsAuthenticated(Boolean(localStorage.getItem('finops-auth-user')))
  }

  const handleSignOut = () => {
    localStorage.removeItem('finops-auth-user')
    setIsAuthenticated(false)
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="relative">
          <ProfessionalDashboard />
          <button
            onClick={handleSignOut}
            className="fixed bottom-6 right-6 z-[60] px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-medium backdrop-blur-xl flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      ) : (
        <LandingPage
          onSignIn={() => openAuthModal('signin')}
          onSignUp={() => openAuthModal('signup')}
        />
      )}

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={handleCloseModal}
          onSwitchMode={setAuthMode}
        />
      )}
    </>
  )
}

