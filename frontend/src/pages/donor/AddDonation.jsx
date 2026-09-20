import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiUploadCloud } from 'react-icons/fi';
import { donationService } from '../../services/donationService';

const CATEGORIES = [
  'Cooked Food', 'Raw Food', 'Bakery', 'Vegetables', 'Fruits',
  'Beverages', 'Packaged Food', 'Dairy', 'Desserts',
];

const AddDonation = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('foodName', data.foodName);
      formData.append('category', data.category);
      formData.append('description', data.description || '');
      formData.append('quantity[value]', data.quantityValue);
      formData.append('quantity[unit]', data.quantityUnit);
      formData.append('expiryTime', data.expiryTime);
      formData.append('pickupTime[start]', data.pickupStart);
      formData.append('pickupTime[end]', data.pickupEnd);
      formData.append('pickupAddress', data.pickupAddress);
      formData.append('location[coordinates][0]', data.longitude);
      formData.append('location[coordinates][1]', data.latitude);
      images.forEach((file) => formData.append('images', file));

      await donationService.create(formData);
      toast.success('Donation posted successfully!');
      navigate('/dashboard/my-donations');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create donation');
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">Add a Donation</h1>
      <p className="text-sm text-slate-500 mb-8">Share details about the surplus food you'd like to donate.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Food Name</label>
          <input className="input-field" placeholder="e.g. Vegetable Biryani" {...register('foodName', { required: true })} />
          {errors.foodName && <p className="text-danger text-xs mt-1">Food name is required</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Category</label>
            <select className="input-field" {...register('category', { required: true })}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Quantity</label>
            <div className="flex gap-2">
              <input type="number" min="1" className="input-field" placeholder="40" {...register('quantityValue', { required: true })} />
              <select className="input-field" {...register('quantityUnit')}>
                <option value="servings">servings</option>
                <option value="plates">plates</option>
                <option value="kg">kg</option>
                <option value="packets">packets</option>
                <option value="liters">liters</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Description</label>
          <textarea rows={3} className="input-field" placeholder="Any notes about the food..." {...register('description')} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Expiry Time</label>
            <input type="datetime-local" className="input-field" {...register('expiryTime', { required: true })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Pickup Start</label>
              <input type="datetime-local" className="input-field" {...register('pickupStart', { required: true })} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Pickup End</label>
              <input type="datetime-local" className="input-field" {...register('pickupEnd', { required: true })} />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Pickup Address</label>
          <input className="input-field" placeholder="Street, area, city" {...register('pickupAddress', { required: true })} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Latitude</label>
            <input type="number" step="any" className="input-field" placeholder="19.0760" {...register('latitude', { required: true })} />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Longitude</label>
            <input type="number" step="any" className="input-field" placeholder="72.8777" {...register('longitude', { required: true })} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 block">Photos</label>
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-white/20 rounded-xl p-8 cursor-pointer hover:border-primary transition-colors">
            <FiUploadCloud size={28} className="text-slate-400" />
            <span className="text-sm text-slate-500">
              {images.length ? `${images.length} image(s) selected` : 'Click to upload up to 5 images'}
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => setImages(Array.from(e.target.files).slice(0, 5))}
            />
          </label>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
          {isSubmitting ? 'Posting...' : 'Post Donation'}
        </button>
      </form>
    </div>
  );
};

export default AddDonation;
