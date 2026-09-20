import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const roles = [
  { value: 'donor', label: 'Donor', desc: 'Restaurant, household, or business donating food' },
  { value: 'volunteer', label: 'Volunteer', desc: 'Help collect and deliver food' },
  { value: 'ngo', label: 'NGO', desc: 'Organization distributing food to those in need' },
];

const RegisterPage = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { role: 'donor' },
  });
  const [selectedRole, setSelectedRole] = useState('donor');
  const { register: signUp } = useAuth();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      await signUp({ ...data, role: selectedRole });
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 relative overflow-hidden paper-grain">
      <div className="absolute top-1/3 -right-24 w-72 h-72 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative glass-card w-full max-w-lg p-8"
      >
        <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">Create your account</h1>
        <p className="text-sm text-slate-500 mb-6">Join the movement against food waste.</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {roles.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setSelectedRole(r.value)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                selectedRole === r.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-slate-200 dark:border-white/10 text-slate-500'
              }`}
            >
              <p className="text-sm font-semibold">{r.label}</p>
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500 -mt-3 mb-5">
          {roles.find((r) => r.value === selectedRole)?.desc}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input placeholder="Full name" className="input-field pl-11" {...register('name', { required: 'Name is required' })} />
            </div>
            {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="Email address"
                className="input-field pl-11"
                {...register('email', { required: 'Email is required' })}
              />
            </div>
            {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input placeholder="Phone number (optional)" className="input-field pl-11" {...register('phone')} />
            </div>
          </div>

          <div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="Password"
                className="input-field pl-11"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'At least 8 characters' },
                })}
              />
            </div>
            {errors.password && <p className="text-danger text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="Confirm password"
                className="input-field pl-11"
                {...register('confirmPassword', {
                  validate: (value) => value === password || 'Passwords do not match',
                })}
              />
            </div>
            {errors.confirmPassword && <p className="text-danger text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
