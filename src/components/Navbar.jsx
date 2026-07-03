import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation, useSearchParams } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
      setMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/movies', label: 'Movies' },
    { to: '/tv', label: 'TV Shows' },
    { to: '/anime', label: 'Anime' },
    { to: '/kdrama', label: 'K-Drama' },
    { to: '/', label: 'Admin' },
  ]

  const linkClass = ({ isActive }) =>
    `text-[13px] font-medium transition-colors duration-200 whitespace-nowrap ${isActive
      ? 'text-white font-bold'
      : 'text-[#e5e5e5] hover:text-[#b3b3b3]'
    }`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#141414] shadow-lg shadow-black/30'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-14 3xl:px-16 h-[56px] sm:h-[64px] md:h-[68px]">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group shrink-0 mr-6 md:mr-10"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#fbbf24] rounded flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.5)] group-hover:scale-110 transition-all duration-300">
             <div className="flex items-center justify-center transform -translate-x-[0.5px]">
                <span className="text-black font-black text-xl sm:text-2xl italic leading-none">M</span>
             </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white text-lg sm:text-xl font-black italic tracking-tighter uppercase flex items-center">
              Movie<span className="text-[#fbbf24]">Cafe</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6 flex-1">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center">
            <div className={`flex items-center rounded transition-all duration-300 ease-out ${
              searchOpen
                ? 'bg-black border border-white/50 px-3'
                : 'border border-transparent'
            }`}>
              <button
                type="button"
                onClick={() => {
                  if (searchOpen && searchQuery) {
                    handleSearch({ preventDefault: () => {} })
                  } else {
                    setSearchOpen(!searchOpen)
                  }
                }}
                className="text-white hover:text-white/70 transition-colors p-1.5 shrink-0"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  const val = e.target.value
                  setSearchQuery(val)
                  if (val.trim()) {
                    navigate(`/search?q=${encodeURIComponent(val.trim())}`, { replace: true })
                  }
                }}
                placeholder="Titles, people, genres"
                className={`bg-transparent text-white text-sm outline-none placeholder-[#808080] transition-all duration-300 ${
                  searchOpen ? 'w-[140px] sm:w-48 md:w-56 lg:w-64 py-2 opacity-100' : 'w-0 py-2 opacity-0 pointer-events-none'
                }`}
                onBlur={() => {
                  setTimeout(() => {
                    if (!searchQuery) setSearchOpen(false)
                  }, 200)
                }}
              />
              {searchOpen && searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    // If on the search page, clear the URL param too
                    if (location.pathname === '/search') {
                      setSearchParams({})
                    }
                    searchRef.current?.focus()
                  }}
                  className="text-[#808080] hover:text-white transition-colors p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </form>

          {/* Theme Toggle */}
          <button className="hidden md:flex text-white hover:text-white/70 transition-colors p-1.5" aria-label="Toggle Theme">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>



          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-[#141414] border-t border-white/[0.06]">
          <div className="px-5 py-3 flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                end={link.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="py-3.5 border-b border-white/[0.06] text-[15px]">{link.label}</div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
