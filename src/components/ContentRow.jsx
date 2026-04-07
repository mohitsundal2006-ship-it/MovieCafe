import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MediaCard from './MediaCard'

export default function ContentRow({ title, fetcher, mediaType, isRestrictedGrid = false }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const rowRef = useRef(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    setIsLoggedIn(!!user)
    
    let cancelled = false
    fetcher()
      .then((res) => {
        if (!cancelled) {
          setItems(res.data.results || [])
          setLoading(false)
        }
      })
      .catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const scroll = (direction) => {
    const container = rowRef.current
    if (!container) return
    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const c = rowRef.current
    if (!c) return
    setShowLeft(c.scrollLeft > 20)
    setShowRight(c.scrollLeft < c.scrollWidth - c.clientWidth - 20)
  }

  if (loading) {
    return (
      <div className="px-4 sm:px-8 md:px-14 mb-6 sm:mb-8">
        <div className="h-5 w-44 skeleton rounded mb-3" />
        <div className="flex gap-1.5 sm:gap-2 overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[140px] sm:w-[195px] md:w-[234px] aspect-video skeleton rounded-md" />
          ))}
        </div>
      </div>
    )
  }

  if (!items.length) return null

  return (
    <div className="mb-2 sm:mb-4 group/row">
      {/* Row Header */}
      <div className="flex items-center gap-2 px-4 sm:px-8 md:px-14 mb-4 sm:mb-6 mt-4 sm:mt-8">
        <h2 className="section-title">{title}</h2>
        <span className="text-[#fbbf24] text-xs font-semibold opacity-0 group-hover/row:opacity-100 transition-all duration-300 flex items-center gap-1 cursor-pointer hover:underline">
          Explore All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>

      <div className="relative">
        {/* Left fade + arrow */}
        {showLeft && (
          <>
            <div className="hidden sm:block absolute left-0 top-0 bottom-0 z-10 w-16 row-fade-left pointer-events-none" />
            <button
              onClick={() => scroll('left')}
              className="hidden sm:flex absolute left-0 top-0 bottom-0 z-20 w-10 md:w-12 text-white items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-black/40"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-9 md:w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </>
        )}

        {/* Scrollable row */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className={`flex gap-1.5 sm:gap-2 overflow-x-auto hide-scrollbar px-4 sm:px-8 md:px-14 py-1 sm:py-3 relative ${isRestrictedGrid ? 'blur-sm opacity-60 pointer-events-none select-none' : ''}`}
        >
          {items.map((item, index) => (
            <MediaCard 
              key={item.id} 
              item={item} 
              mediaType={mediaType} 
              locked={!isLoggedIn && !isRestrictedGrid && index % 3 === 2} 
            />
          ))}
        </div>

        {isRestrictedGrid && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-auto">
            <div className="bg-black/80 border border-white/20 px-6 py-4 rounded-lg shadow-2xl flex flex-col items-center gap-3 backdrop-blur-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#fbbf24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-white font-bold tracking-wider text-sm sm:text-base text-center">LOGIN REQUIRED TO VIEW FULL CONTENT</span>
              <Link to="/login" className="mt-1 bg-[#fbbf24] text-black font-bold text-sm px-6 py-1.5 rounded hover:bg-[#f59e0b] transition-colors">Login Now</Link>
            </div>
          </div>
        )}

        {/* Right fade + arrow */}
        {showRight && (
          <>
            <div className="hidden sm:block absolute right-0 top-0 bottom-0 z-10 w-16 row-fade-right pointer-events-none" />
            <button
              onClick={() => scroll('right')}
              className="hidden sm:flex absolute right-0 top-0 bottom-0 z-20 w-10 md:w-12 text-white items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-black/40"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-9 md:w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="px-4 sm:px-8 md:px-14 mt-4 mb-2 flex justify-center">
        <button className="border border-[#fbbf24] text-[#fbbf24] font-medium text-sm px-6 py-2 rounded-full hover:bg-[#fbbf24] hover:text-black transition-colors duration-300">
          View All {title}
        </button>
      </div>
    </div>
  )
}
