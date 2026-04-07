import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { searchMulti, getTrending } from '../services/tmdb'
import MediaCard from '../components/MediaCard'

const TRENDING_SEARCHES = ['Marvel', 'DC', 'Star Wars', 'Game of Thrones', 'Breaking Bad', 'Stranger Things', 'The Office', 'Friends', 'Dark', 'Squid Game']

// A no-op fetcher that returns empty results when there's no query
const emptyFetcher = () => Promise.resolve({ data: { results: [], total_pages: 0 } })

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const debouncedQuery = useDebounce(query, 400)
  const [trending, setTrending] = useState([])

  useEffect(() => {
    if (!debouncedQuery) {
      getTrending()
        .then(res => setTrending((res.data.results || []).filter(i => i.backdrop_path).slice(0, 18)))
        .catch(() => {})
    }
  }, [debouncedQuery])

  // Only pass real fetcher when there's a query; use emptyFetcher otherwise
  const fetcher = useCallback(
    (page) => {
      if (!debouncedQuery.trim()) return emptyFetcher(page)
      return searchMulti(debouncedQuery, page)
    },
    [debouncedQuery]
  )

  const { results, loading, sentinelRef, reset } = useInfiniteScroll(fetcher)

  // Reset results whenever the query changes
  useEffect(() => {
    reset()
  }, [debouncedQuery, reset])

  const filtered = results.filter(item => item.media_type === 'movie' || item.media_type === 'tv')

  return (
    <div className="min-h-screen bg-[#141414] pt-[80px] sm:pt-[90px] md:pt-[100px] pb-12">
      {/* Header */}
      <div className="px-4 sm:px-8 md:px-14 mb-6">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          {debouncedQuery ? `Results for "${debouncedQuery}"` : 'Search'}
        </h1>
        {!debouncedQuery && (
          <p className="text-[#808080] text-sm">Find movies, TV shows, anime, K-drama and more.</p>
        )}
      </div>

      {/* Trending searches chips */}
      {!debouncedQuery && (
        <div className="px-4 sm:px-8 md:px-14 mb-10">
          <h2 className="text-white font-semibold text-lg mb-4">Trending Searches</h2>
          <div className="flex flex-wrap gap-2.5">
            {TRENDING_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => setSearchParams({ q: term })}
                className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#e50914] text-white text-sm px-5 py-2.5 rounded-full transition-all duration-200 border border-white/[0.06] hover:border-[#e50914]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Trending grid */}
      {!debouncedQuery && trending.length > 0 && (
        <div className="px-4 sm:px-8 md:px-14 mb-10">
          <h2 className="text-white font-semibold text-lg mb-4">Trending Now</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
            {trending.map(item => (
              <MediaCard key={item.id} item={item} isGridItem />
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {debouncedQuery && filtered.length === 0 && !loading && (
        <div className="text-center py-24 px-4">
          <p className="text-[#808080] text-lg mb-2">No results for <strong className="text-white">"{debouncedQuery}"</strong></p>
          <p className="text-[#555] text-sm">Try different keywords or check your spelling.</p>
        </div>
      )}

      {/* Loading state for initial search */}
      {debouncedQuery && filtered.length === 0 && loading && (
        <div className="px-4 sm:px-8 md:px-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="aspect-video skeleton rounded-md" />
            ))}
          </div>
        </div>
      )}

      {/* Search results grid */}
      {debouncedQuery && filtered.length > 0 && (
        <div className="px-4 sm:px-8 md:px-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3">
            {filtered.map((item) => (
              <MediaCard key={item.id} item={item} isGridItem />
            ))}
            {loading &&
              Array.from({ length: 12 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="aspect-video skeleton rounded-md" />
              ))}
          </div>
          {sentinelRef && <div ref={sentinelRef} className="h-10" />}
        </div>
      )}
    </div>
  )
}
