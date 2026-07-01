import React, { useEffect, useState } from 'react';
import { User, Save, Loader2 } from 'lucide-react';
import api from '../api/axios';

const ProfileForm = ({ initialData, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        firstName: initialData?.firstName || "",
        lastName: initialData?.lastName || "",
        email: initialData?.email || "",
        bio: initialData?.bio || "",
    });

    useEffect(() => {
        setFormData({
            firstName: initialData?.firstName || "",
            lastName: initialData?.lastName || "",
            email: initialData?.email || "",
            bio: initialData?.bio || "",
        });
    }, [initialData]);

    const canEditProfileDetails = initialData?.role === 'ADMIN' && !initialData?.isDeleted;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            await api.post('/profile', formData);
            setMessage('Profile updated successfully');
            onSuccess?.();
        } catch (err) {
            setError(err.response?.data?.error || err?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='card p-5 sm:p-6 mb-6'>
            <h2 className='text-base font-medium text-slate-900 mb-6 pb-4
          border-b border-slate-100 flex items-center gap-2'>
                <User className="w-5 h-5 text-slate-400" /> Public Profile
            </h2>
            {error && (
                <div className='bg-rose-50 text-rose-700 p-4 rounded-xl text-sm
                        border border-rose-200 mb-6 flex items-start gap-3'>
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5
                            shrink-0" />
                    {error}
                </div>
            )}
            {message && (
                <div className='bg-emerald-50 text-emerald-700 p-4 rounded-xl
                        text-sm border border-emerald-200 mb-6 flex items-start gap-3'>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500
                            mt-1.5 shrink-0" />
                    {message}
                </div>
            )}
            <div className='space-y-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                        <input
                            disabled={!canEditProfileDetails}
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className={`w-full rounded-xl border px-3 py-2 ${!canEditProfileDetails ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : 'border-slate-200'}`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                        <input
                            disabled={!canEditProfileDetails}
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className={`w-full rounded-xl border px-3 py-2 ${!canEditProfileDetails ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : 'border-slate-200'}`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <input
                            disabled={!canEditProfileDetails}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full rounded-xl border px-3 py-2 ${!canEditProfileDetails ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : 'border-slate-200'}`}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Position</label>
                        <input disabled value={initialData.position || ""} className='w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed px-3 py-2' />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                    <textarea
                        disabled={!canEditProfileDetails || initialData.isDeleted}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder='Write a brief bio...'
                        className={`w-full resize-none rounded-xl border px-3 py-2 ${!canEditProfileDetails || initialData.isDeleted ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : 'border-slate-200'}`}
                    />
                    <p className='text-sm text-slate-600 mt-1.5'>Only admins can update the profile details above.</p>
                </div>
                {initialData.isDeleted ? (
                    <div className='pt-2'>
                        <div className='p-4 bg-rose-50 border border-rose-200 rounded-xl text-center'>
                            <p className='text-rose-600 font-medium tracking-tight'>Account Deactivated</p>
                            <p className='text-sm text-rose-500 mt-0.5'>You can no longer update your profile.</p>
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-end pt-2'>
                        <button
                            type='submit'
                            disabled={loading || !canEditProfileDetails}
                            className='btn-primary flex items-center gap-2 justify-center w-full sm:w-auto'
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className='w-4 h-4'/>}
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};

export default ProfileForm;