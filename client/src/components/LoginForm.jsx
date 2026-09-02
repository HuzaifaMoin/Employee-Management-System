import React from 'react'
import LoginLeftSide from './LoginLeftSide'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Lock, User, AlertCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext';

   const LoginForm = ({role, title, subtitle, demoCredentials, employeeInfo}) => {

    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [showPassword, SetShowPassword] = useState(false)
    const [error, SetError] = useState("")
    const [loading, SetLoading] = useState(false)
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
       e.preventDefault()
       SetError("")
       SetLoading(true)
       try {
        await login(email, password, role)
        navigate("/dashboard")
       } catch (error) {
        toast.error(error.response?.data?.error || error.message || "login Failed")

       }finally{
        SetLoading(false)
       }
    }

    return (
   <div className="min-h-screen flex flex-col md:flex-row">
            <LoginLeftSide />
            <div className='flex-1 flex items-center justify-center p-6 sm:p-12 bg-white overflow-y-auto'>
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

      {/* Demo Credentials Section for Admin */}
      {demoCredentials && (
        <div className="mb-6 p-4 rounded-lg border-2 border-amber-200 bg-amber-50">
          <div className="flex items-center gap-2 mb-3">
            <Lock size={18} className="text-amber-700" />
            <h2 className="font-semibold text-amber-900 text-sm">Demo Admin Credentials</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-3">
              <User size={16} className="text-amber-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-amber-700 font-medium">Email</p>
                <p className="text-amber-900 font-mono select-all">{demoCredentials.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock size={16} className="text-amber-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-amber-700 font-medium">Password</p>
                <p className="text-amber-900 font-mono select-all">{demoCredentials.password}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Account Information Section */}
      {employeeInfo && (
        <div className="mb-6 p-4 rounded-lg border-2 border-blue-200 bg-blue-50">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={18} className="text-blue-700" />
            <h2 className="font-semibold text-blue-900 text-sm">How Employee Accounts Work</h2>
          </div>
          <div className="space-y-2 text-sm text-blue-900">
            <p className="text-xs leading-relaxed">
              <span className="font-medium">Employee accounts are created by the Admin.</span> Once an Admin creates an employee account, you can log in using the email address and password provided by the Admin.
            </p>
            <ul className="text-xs space-y-1 ml-3">
              <li className="flex gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span><span className="font-medium">Employees cannot</span> create their own accounts</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span>The <span className="font-medium">Admin creates</span> employee accounts</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span>The <span className="font-medium">Admin provides</span> your login email and password</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span>Use those credentials to access the Employee Portal</span>
              </li>
            </ul>
          </div>
        </div>
      )}

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