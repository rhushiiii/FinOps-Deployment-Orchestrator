import { useState, useEffect } from 'react'
import NavItem from './NavItem'
import GlassSurface from '../shared/GlassSurface'

export default function GlassNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('Dashboard')

  const navItems = [
    { label: 'Dashboard' },
    { label: 'Live Monitoring', badge: '3' },
    { label: 'Incidents', badge: '12' },
    { label: 'Compliance' },
    { label: 'Documentation' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-4' : 'py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <GlassSurface
          width="100%"
          height={74}
          borderRadius={18}
          displace={0.5}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          brightness={49}
          opacity={0.93}
          mixBlendMode="screen"
          backgroundOpacity={0.05}
          saturation={1.15}
          className={`border border-white/10 ${scrolled ? 'shadow-2xl' : ''}`}
        >
          <div className="relative grid h-full w-full grid-cols-[minmax(220px,1fr)_auto_minmax(220px,1fr)] items-center px-6 lg:px-8">
            <div className="pointer-events-none absolute left-1/2 top-0 h-12 w-64 -translate-x-1/2 bg-gradient-to-b from-violet-300/25 via-fuchsia-300/12 to-transparent blur-2xl" />
            <div className="flex items-center justify-self-start">
              <span className="text-xl font-semibold tracking-wide text-white/95">FinOps</span>
            </div>

            <div className="hidden items-center justify-self-center gap-2 rounded-2xl border border-white/5 bg-black/20 px-1.5 py-1 lg:flex">
              {navItems.map((item) => (
                <NavItem
                  key={item.label}
                  label={item.label}
                  badge={item.badge}
                  active={activeSection === item.label}
                  onClick={() => setActiveSection(item.label)}
                />
              ))}
            </div>

            <div className="flex items-center justify-self-end gap-3">
              <button className="hidden transform-gpu items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 transition-all duration-300 ease-out hover:scale-[1.05] hover:bg-white/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:flex">
                <span className="font-bold">View Workbench</span>
              </button>
              
              <button className="flex h-10 items-center justify-center rounded-xl border border-transparent px-3 text-sm font-bold text-gray-200 transition-all duration-300 ease-out hover:scale-[1.05] hover:border-white/10 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:hidden">
                Menu
              </button>
            </div>
          </div>
        </GlassSurface>
      </div>
    </nav>
  )
}

