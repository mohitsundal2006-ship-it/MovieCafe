import { SERVERS } from '../utils/constants'

export default function ServerSelector({ currentServer, onServerChange }) {
  return (
    <div className="mt-4">
      <h3 className="text-[#b3b3b3] text-xs font-semibold uppercase tracking-wider mb-3">Select Server</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
        {SERVERS.map((server) => {
          const isActive = server.id === currentServer
          return (
            <button
              key={server.id}
              onClick={() => onServerChange(server.id)}
              className={`flex flex-col items-center justify-center gap-1 px-2 py-2.5 rounded-lg border text-center transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white text-black border-white shadow-lg shadow-white/10'
                  : 'bg-[#2a2a2a] text-[#b3b3b3] border-[#404040] hover:bg-[#3a3a3a] hover:border-[#666]'
              }`}
            >
              <span className="text-lg leading-none">{server.flag}</span>
              <span className={`text-[11px] font-medium leading-tight ${isActive ? 'text-black' : ''}`}>
                {server.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
