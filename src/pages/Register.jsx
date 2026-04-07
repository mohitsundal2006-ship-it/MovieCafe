import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    const users = JSON.parse(localStorage.getItem('moviecafe_users') || '[]')
    
    if (users.find(u => u.email === email)) {
      setError('Email is already registered')
      return
    }

    const newUser = { name, email, password }
    users.push(newUser)
    localStorage.setItem('moviecafe_users', JSON.stringify(users))
    
    // Auto login
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    window.location.href = '/' // Force reload
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative pt-16 pb-12 px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#fbbf24]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="bg-[#141414]/80 backdrop-blur-md p-8 sm:p-12 rounded-lg w-full max-w-md border border-white/10 shadow-2xl relative z-10">
        <h2 className="text-3xl font-black text-white mb-8">Sign Up</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white text-sm px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name}
            onChange={e => setName(e.target.value)}
            className="bg-[#333] text-white px-4 py-3.5 rounded focus:outline-none focus:ring-2 focus:ring-[#fbbf24] transition-all"
          />
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
            className="bg-[#fbbf24] text-black font-bold py-3.5 rounded mt-4 hover:bg-[#f59e0b] shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all"
          >
            Create Account
          </button>
        </form>

        <p className="text-[#8c8c8c] mt-8 text-sm">
          Already have an account? <Link to="/login" className="text-white hover:underline">Sign in.</Link>
        </p>
      </div>
    </div>
  )
}
