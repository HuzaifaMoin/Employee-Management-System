import React, { useState } from 'react'
import { Loader2Icon, LockIcon, X } from 'lucide-react'
import api from '../api/axios'

const ChangePasswordModal = ({ open, onClose }) => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: "", text: "" })
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setMessage({ type: "", text: "" })

        try {
            const token = localStorage.getItem("token")
            const { data } = await api.post(
                '/auth/change-password',
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                    },
                }
            )

            if (!data.success) throw new Error(data.error || "Failed")

            setMessage({
                type: "success",
                text: "Password updated successfully",
            });

            setCurrentPassword("")
            setNewPassword("")

            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            setMessage({ type: "error", text: err?.response?.data?.error || err?.message || "Unable to update password" })
        } finally {
            setLoading(false)
        }
    }

    if (!open) return null;
    return (
        <div onClick={onClose}
            className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' />

            <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in' onClick={(e) => e.stopPropagation()}>
                <div className='flex items-center justify-between p-6 pb-0'>
                    <h2 className='text-lg font-medium text-slate-900 flex items-center gap-2'>
                        <LockIcon className="w-5 h-5 text-slate-400" /> Change Password
                    </h2>
                    <button onClick={onClose} className='p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600'>
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form className="p-6 space-y-5" onSubmit={handleSubmit}>
                    {message.text && (
                        <div className={`p-4 rounded-xl text-sm flex items-start gap-3 border ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}>
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${message.type === "success" ? "bg-emerald-500" : "bg-rose-500"}`} />
                            {message.text}
                        </div>
                    )}
                    <div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700
        mb-2">Current Password</label>
                            <input type="password" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700
        mb-2">New Password</label>
                            <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        </div>
                        <div className='flex gap-3 pt-2'>
                            <button type="button" onClick={onClose} className='btn-secondary flex-1'>
                                Cancel
                            </button>
                            <button type="submit" disabled={loading} className='btn-primary flex-1 flex justify-center items-center gap-2'>
                                {loading && <Loader2Icon className='w-4 h-4 animate-spin' />}
                                Update Password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePasswordModal