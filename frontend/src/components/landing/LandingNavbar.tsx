import GlassSurface from '../shared/GlassSurface'

interface LandingNavbarProps {
  onSignIn: () => void
  onSignUp: () => void
}

export default function LandingNavbar({ onSignIn, onSignUp }: LandingNavbarProps) {
  const navLinks = ['Dashboard', 'Live Monitoring', 'Incidents', 'Compliance', 'Documentation']

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <GlassSurface
          width="100%"
          height={72}
          borderRadius={18}
          displace={0.5}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          brightness={49}
          opacity={0.93}
          mixBlendMode="screen"
          className="border border-white/10"
        >
          <div className="relative grid h-full w-full grid-cols-[minmax(220px,1fr)_auto_minmax(220px,1fr)] items-center px-6 lg:px-8">
            <div className="pointer-events-none absolute left-1/2 top-0 h-12 w-64 -translate-x-1/2 bg-gradient-to-b from-violet-300/25 via-fuchsia-300/12 to-transparent blur-2xl" />
            <div className="flex items-center justify-self-start">
              <span className="font-bold text-xl">FinOps</span>
            </div>

            <div className="hidden items-center justify-self-center gap-6 lg:flex">
              {navLinks.map((label) => (
                <button
                  key={label}
                  type="button"
                  className="text-sm font-semibold tracking-wide text-gray-200 transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-md px-1"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-self-end gap-3">
              <button
                onClick={onSignIn}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 ease-out"
              >
                Sign In
              </button>
              <button
                onClick={onSignUp}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 ease-out"
              >
                Get Started
              </button>
            </div>
          </div>
        </GlassSurface>
      </div>
    </nav>
  )
}

