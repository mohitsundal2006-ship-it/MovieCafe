import { useState, useEffect, useCallback } from 'react'
import HeroBanner from '../components/HeroBanner'
import CategoryHeader from '../components/CategoryHeader'
import ContentRow from '../components/ContentRow'
import MediaGrid from '../components/MediaGrid'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { getPopularTv, discoverTv, getTopRatedTv } from '../services/tmdb'
import { TV_GENRES } from '../utils/constants'

export default function TvShows() {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [heroItems, setHeroItems] = useState([])

  useEffect(() => {
    getPopularTv()
      .then((res) => {
        const results = (res.data.results || []).filter(m => m.backdrop_path)
        setHeroItems(results.slice(0, 3))
      })
      .catch(() => {})
  }, [])

  const fetcher = useCallback(
    (page) => selectedGenre ? discoverTv(selectedGenre, page) : getPopularTv(page),
    [selectedGenre]
  )
  const { results, loading, sentinelRef, reset } = useInfiniteScroll(fetcher)
  useEffect(() => { reset() }, [selectedGenre, reset])

  return (
    <div className="pt-[56px] sm:pt-[64px] md:pt-[68px]">
      {heroItems.length > 0 && <HeroBanner items={heroItems} />}

      <CategoryHeader
        title="TV Shows"
        genres={TV_GENRES}
        selectedGenre={selectedGenre}
        onSelect={setSelectedGenre}
      />

      <div className={`${heroItems.length > 0 ? '-mt-4' : 'pt-4'} relative z-10 pb-8`}>
        {!selectedGenre && (
          <ContentRow title="Top Rated TV" fetcher={getTopRatedTv} mediaType="tv" />
        )}
        <MediaGrid items={results} loading={loading} sentinelRef={sentinelRef} mediaType="tv" />
      </div>
    </div>
  )
}
