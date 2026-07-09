export default function VideoPlayer({ src }) {
  if (!src) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full bg-[#181818] shadow-2xl">
          <div className="relative w-full aspect-video flex items-center justify-center">
            <p className="text-gray-400">Loading player...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full bg-black shadow-2xl">
        <div className="relative w-full aspect-video">
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
    </div>
  )
}


