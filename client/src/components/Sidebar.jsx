import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { dummyProfileData } from "../assets/assets";
import { useAuth } from '../context/AuthContext';

import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarOff,
  Banknote,
  Settings,
  LogOut,
  UserIcon,
  XIcon,
  Menu,
  Loader2,
} from "lucide-react";
import api from "../api/axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const {user, loading, logout} = useAuth()


  useEffect(() => {
    api.get("/profile").then(({data})=>{
      if(data.firstName) setUserName(`${data.firstName} ${data.lastName || ""}`.trim())
    })
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const role = user?.role;

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    role === "ADMIN" ? 
    { name: "Employees", path: "/employee", icon: Users }
    : { name: "Attendance", path: "/attendance", icon: CalendarCheck },
    { name: "Leave", path: "/leave", icon: CalendarOff },
    { name: "Payslips", path: "/payslips", icon: Banknote },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserIcon className="size-7 text-indigo-400" />

            <div>
              <h2 className="font-bold text-white">Employee MS</h2>
              <p className="text-xs text-slate-400">EMS Portal</p>
            </div>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <XIcon size={20} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* User Info */}
      {userName && (
        <div className="mx-3 mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>

            <div>
              <p className="font-medium text-[13px] text-slate-200">
                {userName}
              </p>

              <p className="text-[11px] text-slate-500">
                {role === "EMPLOYEE" ? "Employee" : "Admin"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Menu */}
      <div className="flex-1 p-4 space-y-2">
       {loading ? (
            <div className='px-3 py-3 flex items-center gap-2
            text-slate-500'>
                <Loader2 className="animate-spin w-4 h-4" />
                <span className="text-sm">Loading...</span>
            </div>
       ):(
        menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        }) ) }
        </div>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => {
            logout()
            navigate('/login')
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-950 text-white rounded-lg"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col h-screen w-64 bg-indigo-950 text-white border-r border-white/10">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-indigo-950 text-white z-50 flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;