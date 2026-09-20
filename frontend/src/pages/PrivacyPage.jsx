import React from 'react';

const PrivacyPage = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <h1 className="section-title mb-6">Privacy Policy</h1>
    <p className="text-sm text-slate-500 mb-8">Last updated: July 2026</p>

    <div className="space-y-6 text-slate-600 dark:text-slate-300">
      <section>
        <h2 className="font-display font-semibold text-lg text-dark dark:text-white mb-2">1. Information We Collect</h2>
        <p>
          We collect account information (name, email, phone, location), donation details, and usage data
          necessary to operate the platform, such as pickup addresses and coordinates.
        </p>
      </section>
      <section>
        <h2 className="font-display font-semibold text-lg text-dark dark:text-white mb-2">2. How We Use Your Data</h2>
        <p>
          Your data is used to match donations with NGOs and volunteers, send relevant notifications, verify
          NGO registrations, and improve the platform through aggregated analytics.
        </p>
      </section>
      <section>
        <h2 className="font-display font-semibold text-lg text-dark dark:text-white mb-2">3. Data Sharing</h2>
        <p>
          We only share your contact and pickup details with the specific NGO or volunteer involved in a
          donation transaction. We never sell personal data to third parties.
        </p>
      </section>
      <section>
        <h2 className="font-display font-semibold text-lg text-dark dark:text-white mb-2">4. Data Security</h2>
        <p>
          Passwords are hashed, sensitive routes require authentication, and all traffic is encrypted via
          HTTPS. We follow industry-standard practices to protect your information.
        </p>
      </section>
      <section>
        <h2 className="font-display font-semibold text-lg text-dark dark:text-white mb-2">5. Your Rights</h2>
        <p>
          You may update or delete your account information at any time from your profile settings, or
          contact us to request full account deletion.
        </p>
      </section>
    </div>
  </div>
);

export default PrivacyPage;
