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
  const profileRef = useRef(null)
  
  const [currentUser, setCurrentUser] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      try {
        setCurrentUser(JSON.parse(user))
      } catch (e) {
        console.error("Error parsing user data", e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    window.location.href = '/' // Force reload to apply logout globally
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

          {/* Auth Portal / Profile */}
          {currentUser ? (
            <div className="hidden md:block relative" ref={profileRef}>
              <div 
                className="flex items-center gap-2 group/profile cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-md border border-white/10 hover:bg-black/60 transition-colors">
                  <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white font-bold text-xs overflow-hidden shadow-lg border border-white/20">
                    <img 
                      src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 text-white/60 transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Dropdown Menu - matches user screenshot exactly */}
              {profileOpen && (
                <div className="absolute top-full right-0 mt-2 w-[220px] bg-[#000000]/95 backdrop-blur-md rounded border border-white/10 shadow-2xl overflow-hidden animate-fade-in translate-y-2 z-[60]">
                   {/* User Details */}
                   <div className="flex items-center gap-3 px-4 py-4 hover:bg-white/5 transition-colors group cursor-pointer">
                      <div className="w-8 h-8 rounded bg-red-600 overflow-hidden shadow-md">
                        <img 
                          src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-white text-sm font-bold group-hover:underline">
                        {currentUser.name || 'Mohit Sundal'}
                      </span>
                   </div>

                   {/* Menu Items */}
                   <div className="flex flex-col py-2 border-t border-white/10">
                      <Link to="/profile" className="flex items-center gap-4 px-4 py-3 text-white/90 hover:bg-white/5 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-[14px]">Account</span>
                      </Link>
                      <Link to="/help" className="flex items-center gap-4 px-4 py-3 text-white/90 hover:bg-white/5 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[14px]">Help Centre</span>
                      </Link>
                   </div>

                   {/* Sign Out Footer */}
                   <div className="border-t border-white/20">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-center py-4 text-white hover:bg-white/5 text-sm font-bold transition-colors"
                      >
                        Sign out
                      </button>
                   </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3 ml-2">
              <Link to="/login" className="text-white text-sm font-bold border border-white/80 px-5 py-2 rounded hover:bg-white hover:text-black transition-colors duration-300">
                LOGIN
              </Link>
              <Link to="/register" className="text-black text-sm font-bold bg-[#fbbf24] border border-[#fbbf24] px-5 py-2 rounded shadow-[0_0_12px_rgba(251,191,36,0.6)] hover:shadow-[0_0_20px_rgba(251,191,36,0.8)] hover:bg-[#f59e0b] transition-all duration-300">
                SIGN UP
              </Link>
            </div>
          )}

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
