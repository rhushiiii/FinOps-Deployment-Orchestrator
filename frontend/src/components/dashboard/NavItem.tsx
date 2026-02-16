import { NavItemProps } from '../../types'

export default function NavItem({ label, active, badge, onClick }: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative isolate flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[13px] leading-none transition-all duration-300 ease-out transform-gpu focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
        active
          ? 'scale-[1.03] text-white font-bold'
          : 'text-gray-200 font-bold hover:scale-[1.06] hover:text-white'
      }`}
    >
      <span
        className={`absolute inset-0 rounded-xl transition-all duration-300 ease-out ${
          active
            ? 'bg-gradient-to-r from-violet-500/22 via-purple-500/16 to-fuchsia-500/20 border border-white/15 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_24px_rgba(139,92,246,0.2)]'
            : 'bg-white/0 border border-transparent group-hover:bg-white/[0.06] group-hover:border-white/10'
        }`}
      />
      <span
        className={`absolute -inset-px rounded-xl bg-gradient-to-r from-violet-400/0 via-purple-400/0 to-fuchsia-400/0 blur-md transition-opacity duration-300 ${
          active ? 'opacity-40' : 'opacity-0 group-hover:opacity-30'
        }`}
      />
      <span className="relative z-10 tracking-wide">{label}</span>
      {badge && (
        <span className="relative z-10 ml-1 rounded-full border border-red-400/20 bg-red-500/15 px-2 py-0.5 text-[11px] font-semibold text-red-300">
          {badge}
        </span>
      )}
    </button>
  )
}

