import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { DEPARTMENTS } from '../assets/assets';

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        bio: '',
        joiningDate: '',
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        employmentStatus: 'Active',
        role: 'Employee'
    });
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const isEditMode = !!initialData;


    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                joiningDate: initialData.joinDate
                    ? new Date(initialData.joinDate).toISOString().split("T")[0]
                    : "",
            });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                department: '',
                designation: '',
                bio: '',
                joiningDate: '',
                basicSalary: 0,
                allowances: 0,
                deductions: 0,
                employmentStatus: 'Active',
                role: 'Employee'
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'basicSalary' || name === 'allowances' || name === 'deductions'
                ? parseFloat(value) || 0
                : value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSuccess(formData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                {isEditMode ? 'Edit Employee Details' : 'Add New Employee'}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-6 max-w-3xl animate-fade-in">
                {/* Personal Information */}
                <div className="card p-5 sm:p-6">
                    <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                        <div>
                            <label className="block mb-2">First Name</label>
                            <input
                                name="firstName"
                                required
                                value={formData.firstName || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Last Name</label>
                            <input
                                name="lastName"
                                required
                                value={formData.lastName || ''}
                                onChange={handleChange}
                            />                        </div>

                    </div>
                </div>

                {/* Email Address */}
                {!isEditMode && (
                    <div>
                        <label className="block mb-2">Work Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />                    </div>
                )}

                {/* Phone Number */}
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        required
                        value={formData.phone || ''}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+1 234 567 890"
                    />
                </div>

                {/* Department */}
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Department</label>

                    <select
                        name="department"
                        required
                        value={formData.department || ''}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Department</option>

                        {DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}

                    </select>
                </div>

                {/* Designation */}
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Designation</label>
                    <input
                        type="text"
                        name="designation"
                        required
                        value={formData.designation || ''}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Software Engineer"
                    />
                </div>
                {/* Bio */}
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Bio (Optional)</label>
                    <textarea
                        name="bio"
                        value={formData.bio || ''}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={3}
                        placeholder="Brief description"
                    />
                </div>

                {/* Joining Date */}
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Joining Date</label>
                    <input
                        type="date"
                        name="joiningDate"
                        required
                        value={formData.joiningDate || ''}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Basic Salary */}
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Basic Salary</label>
                    <input
                        type="number"
                        name="basicSalary"
                        min="0"
                        step="0.01"
                        required
                        value={formData.basicSalary || 0}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Allowances */}
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Allowances</label>
                    <input
                        type="number"
                        name="allowances"
                        min="0"
                        step="0.01"
                        required
                        value={formData.allowances || 0}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Deductions */}
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Deductions</label>
                    <input
                        type="number"
                        name="deductions"
                        min="0"
                        step="0.01"
                        required
                        value={formData.deductions || 0}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Conditional Employment Status for Edit Mode */}
                {isEditMode && (
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">Status</label>
                        <select
                            name="employmentStatus"
                            required
                            value={formData.employmentStatus}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Terminated">Terminated</option>
                            <option value="On Leave">On Leave</option>
                        </select>
                    </div>
                )}
                {/* Account Setup */}
                <div className="card p-5 sm:p-6">
                    <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">Account Setup</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">

                        {!isEditMode && (
                            <div>
                                <label className="block mb-2">Temporary Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password || ''}
                                    onChange={handleChange}
                                />            </div>
                        )}
                        {isEditMode && (
                            <div>
                                <label className="block mb-2">Change Password (Optional)</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password || ''}
                                    onChange={handleChange}
                                    placeholder="Leave blank to keep current"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block mb-2">System Role</label>

                            <select
                                name="role"
                                value={formData.role || "Employee"}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded-md"
                            >
                                <option value="Employee">Employee</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Submit Button */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-7">
                    <button type="button" className="btn-secondary" onClick={() =>
                        (onCancel ? onCancel() : navigate(-1))}>
                        Cancel
                    </button>
                    <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center">
                        {loading && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
                        {isEditMode ? "Save Changes" : "Create Employee"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;