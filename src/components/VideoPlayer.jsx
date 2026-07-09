export default function VideoPlayer({ src }) {
  if (!src) {
    return (
      <div className="w-full flex justify-center">
        <div 
          className="w-full bg-[#181818] rounded-xl overflow-hidden aspect-video flex items-center justify-center"
          style={{ maxHeight: '80vh', maxWidth: 'calc(80vh * 16 / 9)' }}
        >
          <p className="text-gray-400">Loading player...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center">
      <div 
        className="w-full bg-black rounded-xl overflow-hidden shadow-2xl relative aspect-video"
        style={{ maxHeight: '80vh', maxWidth: 'calc(80vh * 16 / 9)' }}
      >
        <iframe
          src={src}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          frameBorder="0"
          referrerPolicy="origin"
          title="Video Player"
        />
      </div>
    </div>
  )
}
