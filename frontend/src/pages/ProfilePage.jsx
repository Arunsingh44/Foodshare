import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/miscServices';

const ProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      address: user?.address,
      city: user?.city,
    },
  });

  const {
    register: registerPw,
    handleSubmit: handlePwSubmit,
    reset: resetPw,
    formState: { isSubmitting: isPwSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await userService.updateProfile(data);
      await refreshUser();
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const onChangePassword = async (data) => {
    try {
      await userService.changePassword(data);
      toast.success('Password changed successfully');
      resetPw();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">Profile</h1>
        <p className="text-sm text-slate-500">Manage your account details.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 space-y-4">
        <h2 className="font-display font-semibold text-dark dark:text-white mb-2">Personal Information</h2>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Full Name</label>
          <input className="input-field" {...register('name')} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Phone</label>
          <input className="input-field" {...register('phone')} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">City</label>
          <input className="input-field" {...register('city')} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Address</label>
          <input className="input-field" {...register('address')} />
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      <form onSubmit={handlePwSubmit(onChangePassword)} className="glass-card p-8 space-y-4">
        <h2 className="font-display font-semibold text-dark dark:text-white mb-2">Change Password</h2>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Current Password</label>
          <input type="password" className="input-field" {...registerPw('currentPassword', { required: true })} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">New Password</label>
          <input type="password" className="input-field" {...registerPw('newPassword', { required: true, minLength: 8 })} />
        </div>
        <button type="submit" disabled={isPwSubmitting} className="btn-secondary disabled:opacity-60">
          {isPwSubmitting ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
