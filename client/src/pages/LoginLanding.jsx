import React from 'react'
import LoginLeftSide from '../components/LoginLeftSide'
import { ArrowRight, ShieldIcon, UserIcon } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading'

const LoginLanding = () => {
    const {user, loading} = useAuth()

if(loading) return <Loading />
if(user) return <Navigate to="/"/>


    const portalOptions = [
        {
            to: "/login/admin",
            title: "Admin Portal",
            subtitle: "Manage employees, departments, payroll, and system configurations. ",
            icon: ShieldIcon
        },
        {
            to: "/login/employee",
            title: "Employee Portal",
            subtitle: "View payslips, submit leave requests, and manage your profile.",
            icon: UserIcon
        }
    ]
    return (

        <div className="min-h-screen flex flex-col md:flex-row">
            <LoginLeftSide />

            {/* Right Column: Portal Selection Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">
                {/* Centered Content Container */}
                <div className="w-full max-w-md animate-fade-in relative z-10">
                    <h2 className="text-3xl font-semibold text-slate-900 mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-slate-500 mb-8">
                        Select your portal to securely access the system.
                    </p>

                    {/* Portal Selection Buttons */}
                    <div className="space-y-4">
                        {portalOptions.map((option) => (
                            <Link key={option.title} to={option.to}>
                                <button className="w-full flex items-center justify-between p-5 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 group text-left">
                                    <span className="text-slate-700 font-medium group-hover:text-indigo-600 transition-colors">
                                        {option.title}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer Copyright */}
                <div className="text-center md:text-left text-xs text-slate-400 w-full max-w-md mx-auto mt-8">
                    © 2026 Huzaifa Moin.
                </div>
            </div>
        </div>

    )
}

export default LoginLanding