import React, { useCallback, useEffect, useState } from 'react'
import { dummyEmployeeData, dummyPayslipData } from '../assets/assets'
import Loading from '../components/Loading'
import PayslipList from '../components/payslip/PayslipList'
import GeneratePayslipForm from '../components/payslip/GeneratePayslipForm' // Import the new form
import { PlusIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import toast from 'react-hot-toast'

const Payslips = () => {
  const { user } = useAuth()
  const [payslips, setPaySlips] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false) // Toggle view state
  const isAdmin = user?.role === "ADMIN";

  const fetchPaySlips = useCallback(async () => {
     try {
      const res = await api.get('/payslips')
      setPaySlips(res.data.data || [])
      
     } catch (err) {
      toast.error(err?.response?.data?.error || err?.message)
     } finally {
      setLoading(false)
     }
  }, [])

  useEffect(() => {
    fetchPaySlips()
  }, [fetchPaySlips])

  useEffect(() => {
    if (isAdmin) api.get('/employees').then((res)=> 
      setEmployees(res.data.filter((e)=>!e.isDeleted))).catch(
        ()=>{})
  }, [isAdmin])

  // Handle addition of freshly built records 
 const handleAddNewPayslip = async (newPayslip) => {
  try {
    const res = await api.post("/payslips", newPayslip);

    toast.success("Payslip created successfully");

    setPaySlips((prev) => [res.data.data, ...prev]);

    setShowForm(false);
  } catch (err) {
    toast.error(err.response?.data?.error || err.message);
  }
};

  if (loading) return <Loading />

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">
            {isAdmin ? "Generate and manage employee payslips" : "Your payslip history"}
          </p>
        </div>
        
        {/* Styled Interactive Admin Action CTA Trigger Button */}
         {isAdmin && (
          <button className='btn-primary flex items-center gap-2 w-full sm:w-auto justify-center'
            onClick={() => setShowForm(true)}>
            <PlusIcon className='w-4 h-4' /> Create New Payslips
          </button>
        )}
      </div>

      {/* Conditionally reveal compilation form panel or list deck based on state control flags */}
      {showForm ? (
        <GeneratePayslipForm 
          employees={employees} 
          onFormSubmit={handleAddNewPayslip} 
          onCancel={() => setShowForm(false)} 
        />
      ) : (
        <PayslipList payslips={payslips} isAdmin={isAdmin} />
      )}
    </div>
  )
}

export default Payslips