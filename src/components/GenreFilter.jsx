import { useState, useRef, useEffect } from 'react'

export default function GenreFilter({ genres, selectedGenre, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedName = selectedGenre ? genres.find(g => g.id === selectedGenre)?.name : 'Genres'

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 border text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded transition-all duration-200 ${
          isOpen || selectedGenre ? 'bg-white/10 border-white/40' : 'bg-transparent border-white/20 hover:border-white/40'
        }`}
      >
        {selectedName}
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-[280px] sm:w-[380px] md:w-[480px] bg-[#1a1a1a]/98 backdrop-blur-md border border-white/[0.08] rounded-md shadow-[0_8px_30px_rgba(0,0,0,0.7)] z-50 p-4 animate-slide-down">
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-2.5 gap-x-4">
            <li>
              <button
                onClick={() => { onSelect(null); setIsOpen(false) }}
                className={`text-xs sm:text-sm hover:text-white text-left w-full transition-colors ${!selectedGenre ? 'font-semibold text-white' : 'text-[#b3b3b3]'}`}
              >
                All
              </button>
            </li>
            {genres.map((genre) => (
              <li key={genre.id}>
                <button
                  onClick={() => { onSelect(genre.id); setIsOpen(false) }}
                  className={`text-xs sm:text-sm hover:text-white text-left w-full line-clamp-1 transition-colors ${genre.id === selectedGenre ? 'font-semibold text-white' : 'text-[#b3b3b3]'}`}
                >
                  {genre.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
