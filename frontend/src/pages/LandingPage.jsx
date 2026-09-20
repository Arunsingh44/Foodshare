import React from 'react';
import Hero from '../components/landing/Hero';
import StatsSection from '../components/landing/StatsSection';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import CallToAction from '../components/landing/CallToAction';

const LandingPage = () => (
  <>
    <Hero />
    <StatsSection />
    <HowItWorks />
    <Features />
    <Testimonials />
    <CallToAction />
  </>
);

export default LandingPage;
