import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import api from '../services/api';

const ContactPage = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/contact', data);
      toast.success('Message sent! We\'ll get back to you soon.');
      reset();
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-14">
        <h1 className="section-title">Get in Touch</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">We'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          {[
            { icon: FiMail, label: 'Email', value: 'hello@foodshareplus.org' },
            { icon: FiPhone, label: 'Phone', value: '+91 98765 43210' },
            { icon: FiMapPin, label: 'Address', value: 'Mumbai, Maharashtra, India' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass-card p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="font-semibold text-dark dark:text-white">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 space-y-4">
          <div>
            <input className="input-field" placeholder="Your name" {...register('name', { required: true })} />
            {errors.name && <p className="text-danger text-xs mt-1">Name is required</p>}
          </div>
          <div>
            <input type="email" className="input-field" placeholder="Your email" {...register('email', { required: true })} />
            {errors.email && <p className="text-danger text-xs mt-1">Email is required</p>}
          </div>
          <div>
            <input className="input-field" placeholder="Subject" {...register('subject', { required: true })} />
          </div>
          <div>
            <textarea rows={5} className="input-field" placeholder="Your message" {...register('message', { required: true })} />
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
