import React from 'react';

const TermsPage = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 prose prose-slate dark:prose-invert">
    <h1 className="section-title mb-6">Terms of Service</h1>
    <p className="text-sm text-slate-500 mb-8">Last updated: July 2026</p>

    <div className="space-y-6 text-slate-600 dark:text-slate-300">
      <section>
        <h2 className="font-display font-semibold text-lg text-dark dark:text-white mb-2">1. Acceptance of Terms</h2>
        <p>By creating an account or using FoodShare+, you agree to these Terms of Service and our Privacy Policy.</p>
      </section>
      <section>
        <h2 className="font-display font-semibold text-lg text-dark dark:text-white mb-2">2. Food Safety Disclaimer</h2>
        <p>
          FoodShare+ is a matching platform only. We do not inspect, prepare, or guarantee the safety of any
          donated food. Donors and recipients are responsible for ensuring food is safe for consumption.
        </p>
      </section>
      <section>
        <h2 className="font-display font-semibold text-lg text-dark dark:text-white mb-2">3. User Responsibilities</h2>
        <p>
          Users must provide accurate information, honor accepted pickup commitments, and treat other users
          respectfully. NGOs must maintain valid registration documentation.
        </p>
      </section>
      <section>
        <h2 className="font-display font-semibold text-lg text-dark dark:text-white mb-2">4. Account Suspension</h2>
        <p>
          FoodShare+ reserves the right to suspend or terminate accounts that violate these terms, post
          fraudulent listings, or engage in abusive behavior.
        </p>
      </section>
      <section>
        <h2 className="font-display font-semibold text-lg text-dark dark:text-white mb-2">5. Limitation of Liability</h2>
        <p>
          FoodShare+ is not liable for any illness, injury, or damages arising from donated food or from
          interactions between users facilitated through the platform.
        </p>
      </section>
    </div>
  </div>
);

export default TermsPage;
