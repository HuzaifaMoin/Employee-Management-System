import React, { useCallback, useEffect, useState } from 'react'
import { dummyEmployeeData, dummyPayslipData } from '../assets/assets'
import Loading from '../components/Loading'
import PayslipList from '../components/payslip/PayslipList'
import GeneratePayslipForm from '../components/payslip/GeneratePayslipForm' // Import the new form
import { PlusIcon } from 'lucide-react'

const Payslips = () => {
  const [payslips, setPaySlips] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false) // Toggle view state
  const isAdmin = true

  const fetchPaySlips = useCallback(async () => {
    setPaySlips(dummyPayslipData)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    fetchPaySlips()
  }, [fetchPaySlips])

  useEffect(() => {
    if (isAdmin) setEmployees(dummyEmployeeData)
  }, [isAdmin])

  // Handle addition of freshly built records 
  const handleAddNewPayslip = (newPayslip) => {
    // Generate a mock unique id
    const mockCreatedRecord = {
      ...newPayslip,
      id: `pay_${Date.now()}`
    }

    // Append to dashboard record state and hide form
    setPaySlips((prev) => [mockCreatedRecord, ...prev])
    setShowForm(false)
  }

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