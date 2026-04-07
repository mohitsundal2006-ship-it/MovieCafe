import { useState, useEffect, useCallback } from 'react'
import HeroBanner from '../components/HeroBanner'
import CategoryHeader from '../components/CategoryHeader'
import ContentRow from '../components/ContentRow'
import MediaGrid from '../components/MediaGrid'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { getPopularMovies, discoverMovies, getTopRatedMovies, getActionMovies } from '../services/tmdb'
import { MOVIE_GENRES } from '../utils/constants'

export default function Movies() {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [heroItems, setHeroItems] = useState([])

  useEffect(() => {
    getPopularMovies()
      .then((res) => {
        const results = (res.data.results || []).filter(m => m.backdrop_path)
        setHeroItems(results.slice(0, 5))
      })
      .catch(() => {})
  }, [])

  const fetcher = useCallback(
    (page) => selectedGenre ? discoverMovies(selectedGenre, page) : getPopularMovies(page),
    [selectedGenre]
  )
  const { results, loading, sentinelRef, reset } = useInfiniteScroll(fetcher)
  useEffect(() => { reset() }, [selectedGenre, reset])

  return (
    <div className="pt-[56px] sm:pt-[64px] md:pt-[68px]">
      {heroItems.length > 0 && <HeroBanner items={heroItems.slice(0, 3)} />}

      <CategoryHeader
        title="Movies"
        genres={MOVIE_GENRES}
        selectedGenre={selectedGenre}
        onSelect={setSelectedGenre}
      />

      <div className={`${heroItems.length > 0 ? '-mt-4' : 'pt-4'} relative z-10 pb-8`}>
        {!selectedGenre && (
          <>
            <ContentRow title="Top Rated" fetcher={getTopRatedMovies} mediaType="movie" />
            <ContentRow title="Action" fetcher={getActionMovies} mediaType="movie" />
          </>
        )}
        <MediaGrid items={results} loading={loading} sentinelRef={sentinelRef} mediaType="movie" />
      </div>
    </div>
  )
}
