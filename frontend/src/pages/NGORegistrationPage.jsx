import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ngoService } from '../services/miscServices';
import { useAuth } from '../context/AuthContext';

const NGORegistrationPage = () => {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'registrationDocument') {
          if (value?.[0]) formData.append('registrationDocument', value[0]);
        } else {
          formData.append(key, value);
        }
      });
      await ngoService.register(formData);
      toast.success('NGO registration submitted for review!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  if (user && user.role !== 'ngo') {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-slate-600 dark:text-slate-300">
          NGO registration is only available for accounts created with the "NGO" role. Please sign up with that role first.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-title text-center mb-2">Register Your NGO</h1>
      <p className="text-center text-slate-600 dark:text-slate-300 mb-10">
        Get verified to start accepting donations on FoodShare+.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Organization Name</label>
          <input className="input-field" {...register('organizationName', { required: true })} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Registration Number</label>
          <input className="input-field" {...register('registrationNumber', { required: true })} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Description</label>
          <textarea rows={4} className="input-field" {...register('description')} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Website (optional)</label>
            <input className="input-field" {...register('website')} />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Years of Operation</label>
            <input type="number" className="input-field" {...register('yearsOfOperation')} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Registration Document</label>
          <input type="file" accept=".pdf,image/*" className="input-field" {...register('registrationDocument')} />
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
          {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
        </button>
      </form>
    </div>
  );
};

export default NGORegistrationPage;
