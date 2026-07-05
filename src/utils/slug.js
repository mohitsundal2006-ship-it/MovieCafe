export function generateSlug(title, year) {
  if (!title) return ''
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  if (year) {
    slug += `-${year}`
  }
  return slug
}

export function buildAnimeEmbedUrl(titleSlug, episode, server) {
  let url = `https://anime.autoembed.cc/embed/${titleSlug}-episode-${episode}`
  if (server && server > 1) url += `?server=${server}`
  return url
}

export function buildDramaEmbedUrl(titleSlug, episode, server) {
  let url = `https://drama.autoembed.cc/embed/${titleSlug}-episode-${episode}`
  if (server && server > 1) url += `?server=${server}`
  return url
}

export function buildMovieEmbedUrl(id, server) {
  switch (server) {
    case 1:
      return `https://player.autoembed.app/embed/movie/${id}`;
    case 2:
      return `https://vidfast.pro/movie/${id}`;
    case 3:
      return `https://vidnest.fun/movie/${id}`;
    case 8:
      return `https://cinemaos.live/movie/${id}`;
    default:
      return `https://player.autoembed.app/embed/movie/${id}`;
  }
}

export function buildTvEmbedUrl(id, season, episode, server) {
  switch (server) {
    case 1:
      return `https://player.autoembed.app/embed/tv/${id}/${season}/${episode}`;
    case 2:
      return `https://vidfast.pro/tv/${id}/${season}/${episode}`;
    case 3:
      return `https://vidnest.fun/tv/${id}/${season}/${episode}`;
    case 8:
      return `https://cinemaos.live/tv/${id}`;
    default:
      return `https://player.autoembed.app/embed/tv/${id}/${season}/${episode}`;
  }
}
