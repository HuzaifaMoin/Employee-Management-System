import React, { useState } from 'react';
import { 
  Users, 
  CalendarCheck, 
  CalendarOff, 
  Banknote,
  TrendingUp,
  UserPlus,
  Clock
} from 'lucide-react';
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from '../assets/assets';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import EmployeeDashboard from '../components/EmployeeDashboard';
import AdminDashboard from '../components/AdminDashboard';

const Dashboard = () => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData(dummyAdminDashboardData)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [loading])

    if (loading) {
      return <Loading />
    }
    if (!data) {
      return <p className='text-center text-slate-500 py-12'> 
      Failed to load Dashboard</p>
    }

    if (data.role === "ADMIN") {
      return <div> <AdminDashboard data={data}/></div>
    } else {
      return <div> <EmployeeDashboard data={data} /></div>
    }



  // const stats = [
  //   { title: 'Total Employees', value: '124', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
  //   { title: 'Today Attendance', value: '98%', icon: CalendarCheck, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  //   { title: 'Pending Leaves', value: '12', icon: CalendarOff, color: 'text-amber-600', bg: 'bg-amber-100' },
  //   { title: 'Monthly Payroll', value: '$45,200', icon: Banknote, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  // ];

  // const recentActivities = [
  //   { id: 1, type: 'new_employee', user: 'Sarah Jenkins', time: '2 hours ago', description: 'joined as UI Designer' },
  //   { id: 2, type: 'leave_approved', user: 'Michael Chen', time: '5 hours ago', description: 'Vacation request approved' },
  //   { id: 3, type: 'payroll', user: 'Finance Dept', time: '1 day ago', description: 'Generated October payslips' },
  // ];

  }
export default Dashboard;