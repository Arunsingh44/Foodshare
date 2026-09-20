import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import { authService } from '../../services/authService';

const ForgotPasswordPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [resetUrl, setResetUrl] = useState(null);

  const onSubmit = async ({ email }) => {
    try {
      const res = await authService.forgotPassword(email);
      // No email service is configured, so the API returns the reset link
      // directly — show it here so the person can use it right away.
      setResetUrl(res.resetUrl || null);
      if (!res.resetUrl) {
        toast.success("If that email is registered, you'll be able to reset your password.");
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8"
      >
        <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">Forgot password?</h1>
        <p className="text-sm text-slate-500 mb-6">Enter your email to generate a reset link.</p>

        {resetUrl ? (
          <div className="text-center">
            <FiCheckCircle className="mx-auto text-success mb-3" size={32} />
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Here's your password reset link:
            </p>
            <Link
              to={resetUrl.replace(/^.*\/reset-password/, '/reset-password')}
              className="btn-primary w-full break-all !text-xs !py-3"
            >
              Reset My Password
            </Link>
            <p className="text-xs text-slate-400 mt-4">This link expires in 30 minutes.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
              {isSubmitting ? 'Generating link...' : 'Generate Reset Link'}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-slate-500 mt-6">
          Remembered your password?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
