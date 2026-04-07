import GenreFilter from './GenreFilter'

export default function CategoryHeader({ title, genres, selectedGenre, onSelect }) {
  return (
    <div className="bg-[#141414] left-0 right-0 z-40">
      <div className="flex items-center gap-3 sm:gap-5 px-4 sm:px-8 md:px-14 3xl:px-16 py-2.5 sm:py-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white shrink-0">
          {title}
        </h1>
        {genres && (
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelect={onSelect}
          />
        )}
      </div>
    </div>
  )
}
