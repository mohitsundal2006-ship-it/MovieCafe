import { Link } from 'react-router-dom'

export default function Footer() {
  const socialIcons = [
    { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
    { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
    { label: 'Twitter / X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
    { label: 'YouTube', path: 'M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
  ]

  const links = [
    ['Home', '/'], ['Movies', '/movies'], ['TV Shows', '/tv'],
    ['Anime', '/anime'], ['K-Drama', '/kdrama'], ['Search', '/search'],
    ['FAQ', '#'], ['Help Center', '#'], ['Terms of Use', '#'],
    ['Privacy', '#'], ['Cookie Preferences', '#'], ['Contact Us', '#'],
  ]

  return (
    <footer className="w-full bg-[#141414] border-t border-[#333] mt-16 sm:mt-24">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 md:px-14 py-12 sm:py-16">
        {/* Social icons */}
        <div className="flex items-center gap-5 mb-8">
          {socialIcons.map(({ label, path }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="text-white/70 hover:text-white transition-all duration-200 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d={path} />
              </svg>
            </a>
          ))}
        </div>

        {/* Questions */}
        <p className="text-[#808080] text-sm mb-6">Questions? <span className="underline underline-offset-2 cursor-pointer hover:text-white transition-colors">Contact us.</span></p>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3 mb-8">
          {links.map(([label, href]) => (
            href.startsWith('/') ? (
              <Link key={label} to={href} className="text-[#808080] text-[13px] hover:text-white hover:underline underline-offset-2 transition-colors py-0.5">{label}</Link>
            ) : (
              <span key={label} className="text-[#808080] text-[13px] hover:text-white hover:underline underline-offset-2 transition-colors py-0.5 cursor-pointer">{label}</span>
            )
          ))}
        </div>

        {/* Language */}
        <button className="flex items-center gap-2 border border-[#808080]/40 text-[#808080] hover:text-white text-[13px] px-4 py-2 rounded transition-colors duration-200 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          </svg>
          English
        </button>

        {/* Service Code + Copyright */}
        <div className="flex flex-col gap-3">
          <button className="self-start border border-[#808080]/30 text-[#808080] hover:text-white text-[13px] px-4 py-1.5 rounded transition-colors">
            Service Code
          </button>
          <p className="text-[#808080]/60 text-[12px]">&copy; {new Date().getFullYear()} Lucky Streaming, Inc.</p>
        </div>
      </div>
    </footer>
  )
}
