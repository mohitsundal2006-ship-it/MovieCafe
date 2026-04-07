import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getImageUrl, getTitle, getReleaseDate, getYear, formatRating, getMediaType } from '../utils/helpers'
import { BACKDROP_SIZE } from '../config/api'

export default function MediaCard({ item, mediaType, isGridItem, locked = false }) {
  const [imgError, setImgError] = useState(false)

  const type = mediaType || getMediaType(item)
  const title = getTitle(item)
  const year = getYear(getReleaseDate(item))
  const rating = formatRating(item.vote_average)
  const matchScore = Math.round((item.vote_average / 10) * 100)
  const detailPath = type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`

  const image = !imgError && item.poster_path
    ? getImageUrl(item.poster_path)
    : getImageUrl(item.backdrop_path, BACKDROP_SIZE)

  // Extra logic for genres if available or fallback
  const firstGenre = item.genre_ids ? item.genre_ids[0] : null
  const itemGenre = firstGenre ? "Action" : (type === 'movie' ? 'Film' : 'Show') // Minimal tag placeholder

  return (
    <div className={`group relative rounded-md overflow-hidden bg-[#181818] transition-all duration-300 ${
      isGridItem
        ? 'hover:scale-[1.03] hover:z-20 hover:shadow-xl hover:shadow-black/50'
        : 'flex-shrink-0 w-[110px] sm:w-[150px] md:w-[180px] lg:w-[200px] xl:w-[220px] 3xl:w-[240px]'
    }`}>
      <Link to={locked ? '#' : detailPath} className={`block ${locked ? 'cursor-default pointer-events-none' : 'cursor-pointer'}`}>
        {/* Image */}
        <div className="aspect-[2/3] bg-[#0b0f19] overflow-hidden rounded-md relative">
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Top Left Media Type Badge */}
          <div className="absolute top-2 left-2 z-20">
            <span className="text-black bg-[#fbbf24] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg uppercase">
              {type === 'movie' ? 'MOVIE' : 'SERIES'}
            </span>
          </div>
          {/* Match score badge top right */}
          <div className="absolute top-2 right-2 z-20">
            <span className="text-white bg-black/80 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg">
              {matchScore}%
            </span>
          </div>
          
          {/* Lock Overlay */}
          {locked && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          )}
        </div>

        {/* Hover overlay for play icon */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <div className="bg-[#fbbf24] w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.6)] transform scale-75 group-hover:scale-100 transition-all duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black ml-1" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M8 5v14l11-7z" />
               </svg>
             </div>
        </div>
      </Link>
    </div>
  )
}
