import { useState, useEffect, useCallback } from 'react'
import HeroBanner from '../components/HeroBanner'
import CategoryHeader from '../components/CategoryHeader'
import ContentRow from '../components/ContentRow'
import MediaGrid from '../components/MediaGrid'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { getKDrama } from '../services/tmdb'

export default function KDrama() {
  const [heroItems, setHeroItems] = useState([])

  useEffect(() => {
    getKDrama()
      .then((res) => {
        const results = (res.data.results || []).filter(m => m.backdrop_path)
        setHeroItems(results.slice(0, 3))
      })
      .catch(() => {})
  }, [])

  const fetcher = useCallback((page) => getKDrama(page), [])
  const { results, loading, sentinelRef, reset } = useInfiniteScroll(fetcher)

  return (
    <div className="pt-[56px] sm:pt-[64px] md:pt-[68px]">
      {heroItems.length > 0 && <HeroBanner items={heroItems} />}

      <CategoryHeader title="K-Drama" />

      <div className={`${heroItems.length > 0 ? '-mt-4' : 'pt-4'} relative z-10 pb-8`}>
        <ContentRow title="Popular K-Drama" fetcher={getKDrama} mediaType="tv" />
        <MediaGrid items={results} loading={loading} sentinelRef={sentinelRef} mediaType="tv" />
      </div>
    </div>
  )
}
