import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const GeneratePayslipForm = ({ employees = [], onFormSubmit, onCancel }) => {
  const currentYear = new Date().getFullYear()
  
  // 1. Setup Form Fields State
  const [formData, setFormData] = useState({
    employeeId: '',
    month: new Date().getMonth() + 1, // Default current month
    year: currentYear,
    basicSalary: '',
    allowances: '',
    deductions: ''
  })

  const [netSalary, setNetSalary] = useState(0)

  // 2. Automatically calculate Net Salary whenever income fields change
  useEffect(() => {
    const basic = parseFloat(formData.basicSalary) || 0
    const allow = parseFloat(formData.allowances) || 0
    const deduct = parseFloat(formData.deductions) || 0
    
    // Net Salary = Basic + Allowances - Deductions
    setNetSalary(basic + allow - deduct)
  }, [formData.basicSalary, formData.allowances, formData.deductions])

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle Submission
  const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.employeeId) {
    toast.error("Please select an employee");
    return;
  }

  onFormSubmit({
    employeeId: formData.employeeId,
    month: Number(formData.month),
    year: Number(formData.year),
    basicSalary: Number(formData.basicSalary),
    allowances: Number(formData.allowances || 0),
    deductions: Number(formData.deductions || 0),
  });
};

  // Helper arrays for date selection
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]
  const years = [currentYear - 1, currentYear, currentYear + 1]

  return (
    <div className="card max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm ring-1 ring-slate-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Generate New Payslip</h3>
        <p className="text-sm text-slate-500">Calculate totals and issue an employee salary summary record.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: Employee Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
            Select Employee
          </label>
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-blue-500 bg-white text-slate-800"
          >
            <option value="">-- Choose an Employee --</option>
            {employees.map((emp) => (
              <option key={emp._id || emp.id} value={emp._id || emp.id}>
                {emp.firstName} {emp.lastName} ({emp.department || 'Staff'})
              </option>
            ))}
          </select>
        </div>

        {/* Row 2: Month & Year Picker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Payroll Month
            </label>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-blue-500 bg-white"
            >
              {months.map((m, index) => (
                <option key={m} value={index + 1}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Payroll Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-blue-500 bg-white"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Salary Breakdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-dashed border-slate-100">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Basic Salary ($)
            </label>
            <input
              type="number"
              name="basicSalary"
              placeholder="0.00"
              value={formData.basicSalary}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Allowances ($)
            </label>
            <input
              type="number"
              name="allowances"
              placeholder="0.00"
              value={formData.allowances}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Deductions ($)
            </label>
            <input
              type="number"
              name="deductions"
              placeholder="0.00"
              value={formData.deductions}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Live Calculation Output Display */}
        <div className="p-4 bg-slate-50 border border-slate-100 rounded flex justify-between items-center mt-4">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Estimated Payout</span>
            <span className="text-sm text-slate-500 font-medium">Net Take-Home Pay</span>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-bold ${netSalary < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
              ${netSalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 rounded transition-colors shadow-sm shadow-slate-500/10"
          >
            Create & Save Payslip
          </button>
        </div>
      </form>
    </div>
  )
}

export default GeneratePayslipForm