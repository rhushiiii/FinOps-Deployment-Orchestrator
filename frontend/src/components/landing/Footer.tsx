export default function Footer() {
  return (
    <footer className="px-8 lg:px-12 py-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} FinOps. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <button className="hover:text-gray-300 transition-colors">Privacy</button>
          <button className="hover:text-gray-300 transition-colors">Terms</button>
          <button className="hover:text-gray-300 transition-colors">Contact</button>
        </div>
      </div>
    </footer>
  )
}

