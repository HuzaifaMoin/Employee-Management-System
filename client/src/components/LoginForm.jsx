import React from 'react'
import LoginLeftSide from './LoginLeftSide'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

   const LoginForm = ({role, title, subtitle}) => {

    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [showPassword, SetShowPassword] = useState("")
    const [error, SetError] = useState("")
    const [loading, SetLoading] = useState("")

    const handleSubmit = async (e) => {
       e.preventDefault()
       SetError("")
       SetLoading(true)
    }

    return (
   <div className="min-h-screen flex flex-col md:flex-row">
            <LoginLeftSide />
            <div className='flex-1 flex items-center justify-center p-6 sm:p-12 bg-white'>
            <div className="w-full max-w-md animate-fade-in">
          <Link to='/login' className='inline-flex items-center 
        gap-2 text-slate-400 hover:text-slate-700 text-sm mb-10 
        transition-colors'>
          <ArrowLeftIcon size={16}/> Back to portals
      </Link>

      <div className="mb-8">
          <h1 className='text-2xl sm:text-3xl font-medium 
            text-zinc-800'>{title}</h1>
          <p className='text-slate-500 text-sm sm:text-base 
            mt-2'>{subtitle}</p>
      </div>
      {error && ( 
        <div> 
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
              <label htmlFor="email" className='block mb-2 text-sm font-medium text-zinc-800'>Email</label> 
              <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)} required
                  className='bg-zinc-100 border border-zinc-300 text-zinc-900 placeholder:text-zinc-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='you@example.com'
              />
          </div>
          <div>
              <label htmlFor="password" className='block mb-2 text-sm font-medium text-zinc-800'>Password</label>
              <div className='relative'>
                  <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => SetPassword(e.target.value)} required
                      className='bg-zinc-100 border border-zinc-300 text-zinc-900 placeholder:text-zinc-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      placeholder='••••••••'/>

                  <button type="button" className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500' onClick={() => SetShowPassword(!showPassword)}>
                    {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button> 
                  </div>

          </div>
          <button type="submit" disabled={loading} className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
            {loading ? "Logging in..." : "Login"}
          </button>
      </form>
    </div>
  </div>
  </div>
)
}

export default LoginForm