import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getTitle, getReleaseDate, getYear, truncateText, formatRating, getMediaType } from '../utils/helpers'
import { IMAGE_BASE, ORIGINAL_SIZE, BACKDROP_SIZE } from '../config/api'
import MaturityBadge from './MaturityBadge'

export default function HeroBanner({ items }) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  // Backwards-compat: accept single item or array
  const list = Array.isArray(items) ? items : (items ? [items] : [])
  const item = list[current]

  useEffect(() => {
    if (list.length <= 1) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % list.length)
    }, 9000)
    return () => clearInterval(timerRef.current)
  }, [list.length])

  if (!item) return null

  const type = getMediaType(item)
  const title = getTitle(item)
  const year = getYear(getReleaseDate(item))
  const overview = truncateText(item.overview, 180)
  const matchScore = Math.round((item.vote_average / 10) * 100)
  const genres = item.genre_ids?.slice(0, 3) || []

  const backdropFull = item.backdrop_path ? `${IMAGE_BASE}${ORIGINAL_SIZE}${item.backdrop_path}` : null
  const backdropSmall = item.backdrop_path ? `${IMAGE_BASE}${BACKDROP_SIZE}${item.backdrop_path}` : null

  const detailPath = type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`
  const watchPath = type === 'movie' ? `/watch/movie/${item.id}` : detailPath

  return (
    <div className="relative w-full h-[56vh] sm:h-[62vh] md:h-[76vh] lg:h-[85vh] xl:h-[92vh] overflow-hidden">
      {/* Background image - animate on change */}
      {item.backdrop_path && (
        <picture key={item.id}>
          <source media="(min-width: 1280px)" srcSet={backdropFull} />
          <img
            src={backdropSmall}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-center animate-fade-in"
            fetchPriority="high"
          />
        </picture>
      )}

      {/* Layered gradients — Netflix style */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(77deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 50%)'
      }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, #141414 0%, rgba(20,20,20,0.5) 50%, rgba(20,20,20,0) 100%)'
      }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, rgba(20,20,20,0.5) 0%, transparent 15%)'
      }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 z-10 pt-16">

        {/* Stacked Meta / Type badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-4 animate-fade-up text-xs sm:text-sm font-bold tracking-wider uppercase text-white/90">
          <span className="text-[#fbbf24]">FEATURED {type === 'movie' ? 'MOVIE' : 'SERIES'}</span>
          <span className="hidden sm:inline w-1 h-1 bg-white/50 rounded-full"></span>
          <span className="text-[#46d369]">{matchScore}% MATCH</span>
          <span className="hidden sm:inline w-1 h-1 bg-white/50 rounded-full"></span>
          <span className="">{year}</span>
          <span className="hidden sm:inline w-1 h-1 bg-white/50 rounded-full"></span>
          <MaturityBadge voteAverage={item.vote_average} adult={item.adult} />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-6 drop-shadow-2xl leading-[1.1] animate-fade-up delay-100 uppercase italic tracking-tighter text-white max-w-4xl">
          {title.split(' ').map((word, i, arr) => (
            <span key={i} className={i >= arr.length - 1 ? 'text-[#fbbf24]' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>

        {/* Overview text reinstated to match screenshot */}
        <p className="max-w-2xl mx-auto text-white/80 text-xs sm:text-sm md:text-base mb-6 sm:mb-8 font-medium leading-relaxed drop-shadow-lg animate-fade-up delay-200">
          Discover the latest stories, iconic legends, and unseen adventures exclusively on MovieCafe.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 animate-fade-up delay-300 mt-6">
          <Link to={watchPath} className="inline-flex items-center justify-center gap-2 bg-[#fbbf24] text-black font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded hover:bg-[#f59e0b] shadow-lg shadow-[#fbbf24]/20 active:scale-95 transition-all duration-150 no-underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Now
          </Link>
          <Link to={detailPath} className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#fbbf24] text-[#fbbf24] font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded hover:bg-[#fbbf24]/10 active:scale-95 transition-all duration-150 no-underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View Details
          </Link>
        </div>
      </div>

      {/* Cycle dots */}
      {list.length > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); clearInterval(timerRef.current) }}
              className={`w-2 h-0.5 rounded-full transition-all duration-300 ${i === current ? 'bg-[#fbbf24] w-4' : 'bg-white/40'}`}
              aria-label={`Show item ${i + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  )
}
