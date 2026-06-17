import React from 'react';
import { 
  Users, 
  CalendarCheck, 
  CalendarOff, 
  Banknote,
  TrendingUp,
  UserPlus,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Employees', value: '124', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Today Attendance', value: '98%', icon: CalendarCheck, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Pending Leaves', value: '12', icon: CalendarOff, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Monthly Payroll', value: '$45,200', icon: Banknote, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  ];

  const recentActivities = [
    { id: 1, type: 'new_employee', user: 'Sarah Jenkins', time: '2 hours ago', description: 'joined as UI Designer' },
    { id: 2, type: 'leave_approved', user: 'Michael Chen', time: '5 hours ago', description: 'Vacation request approved' },
    { id: 3, type: 'payroll', user: 'Finance Dept', time: '1 day ago', description: 'Generated October payslips' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your workforce today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-emerald-600">
              <TrendingUp size={16} className="mr-1" />
              <span>+4% from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
            <button className="text-sm text-indigo-600 font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold">
                    {activity.user.charAt(0)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{activity.user}</p>
                    <span className="text-xs text-slate-400 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Summary */}
        <div className="space-y-8">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
            <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl flex flex-col items-center gap-2 transition-colors">
                <UserPlus size={20} />
                <span className="text-xs font-medium">Add Employee</span>
              </button>
              <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl flex flex-col items-center gap-2 transition-colors">
                <CalendarCheck size={20} />
                <span className="text-xs font-medium">Attendance</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Pending Approvals</h3>
             <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm font-medium text-slate-700">6 Leave Requests</p>
                  <p className="text-xs text-slate-500 mt-1">Require immediate attention</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm font-medium text-slate-700">2 Document Verification</p>
                  <p className="text-xs text-slate-500 mt-1">New hires onboarding</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;