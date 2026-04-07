import MediaCard from './MediaCard'

export default function MediaGrid({ items, loading, sentinelRef, mediaType, title = 'Browse All' }) {
  return (
    <div className="mt-4 sm:mt-6">
      {title && <h2 className="text-white text-sm sm:text-base md:text-lg font-semibold px-4 sm:px-8 md:px-14 3xl:px-16 mb-3 sm:mb-4">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8 4xl:grid-cols-9 gap-1.5 sm:gap-2 md:gap-3 px-4 sm:px-8 md:px-14 3xl:px-16">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} mediaType={mediaType} isGridItem />
        ))}

        {loading &&
          Array.from({ length: 12 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="aspect-video skeleton rounded-md" />
          ))}
      </div>

      {items.length === 0 && !loading && (
        <div className="text-center text-[#808080] py-20 px-4">
          <p className="text-lg">No content found</p>
          <p className="text-sm mt-1">Try a different filter or search term</p>
        </div>
      )}

      {sentinelRef && (
        <div ref={sentinelRef} className="h-10" />
      )}
    </div>
  )
}
