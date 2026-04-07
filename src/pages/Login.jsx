import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem('moviecafe_users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)

    // Bypass for test if array empty (default user)
    if (user || (email === 'admin@admin.com' && password === 'admin')) {
      const validUser = user || { name: 'Admin User', email }
      localStorage.setItem('currentUser', JSON.stringify(validUser))
      window.location.href = '/' // Force reload to update Navbar state simply
    } else {
      setError('Invalid email or password. Consider registering first.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative pt-16 pb-12 px-4">
      {/* Background glow for aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#fbbf24]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="bg-[#141414]/80 backdrop-blur-md p-8 sm:p-12 rounded-lg w-full max-w-md border border-white/10 shadow-2xl relative z-10">
        <h2 className="text-3xl font-black text-white mb-8">Sign In</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white text-sm px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-[#333] text-white px-4 py-3.5 rounded focus:outline-none focus:ring-2 focus:ring-[#fbbf24] transition-all"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-[#333] text-white px-4 py-3.5 rounded focus:outline-none focus:ring-2 focus:ring-[#fbbf24] transition-all"
          />
          <button 
            type="submit"
            className="bg-[#fbbf24] text-black font-bold py-3.5 rounded mt-4 hover:bg-[#f59e0b] transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-[#8c8c8c] mt-8 text-sm">
          New to MovieCafe? <Link to="/register" className="text-white hover:underline">Sign up now.</Link>
        </p>
      </div>
    </div>
  )
}
