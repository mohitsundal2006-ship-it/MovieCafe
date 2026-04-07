import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getImageUrl, getTitle, getReleaseDate, getYear, formatRating, getMediaType } from '../utils/helpers'
import { BACKDROP_SIZE } from '../config/api'

export default function MediaCard({ item, mediaType, isGridItem }) {
  const [imgError, setImgError] = useState(false)

  const type = mediaType || getMediaType(item)
  const title = getTitle(item)
  const year = getYear(getReleaseDate(item))
  const rating = formatRating(item.vote_average)
  const matchScore = Math.round((item.vote_average / 10) * 100)
  const detailPath = type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`

  const image = !imgError && item.backdrop_path
    ? getImageUrl(item.backdrop_path, BACKDROP_SIZE)
    : getImageUrl(item.poster_path)

  return (
    <div className={`group relative rounded-md overflow-hidden cursor-pointer bg-[#181818] transition-all duration-300 ${
      isGridItem
        ? 'hover:scale-[1.03] hover:z-20 hover:shadow-xl hover:shadow-black/50'
        : 'flex-shrink-0 w-[140px] sm:w-[195px] md:w-[234px] lg:w-[258px] xl:w-[280px] 3xl:w-[320px]'
    }`}>
      <Link to={detailPath} className="block">
        {/* Image */}
        <div className="aspect-video bg-[#252525] overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Match score badge */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-[#46d369] text-[10px] font-bold bg-black/80 px-1.5 py-0.5 rounded">
            {matchScore}%
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-3">
          <h3 className="text-white text-xs sm:text-sm font-bold line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] sm:text-xs">
            <span className="text-[#46d369] font-semibold">{rating}</span>
            {year && <span className="text-white/60">{year}</span>}
          </div>
        </div>
      </Link>

      {/* Title below card */}
      <div className="bg-[#181818] px-2.5 py-2">
        <p className="text-[#e5e5e5] text-[11px] sm:text-xs font-medium line-clamp-1">{title}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[#46d369] text-[10px] font-semibold">{rating}</span>
          {year && <span className="text-[#808080] text-[10px]">{year}</span>}
        </div>
      </div>
    </div>
  )
}
