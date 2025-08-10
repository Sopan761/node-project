import React from 'react';
import Hero from "../components/HomePage/Hero";
import StatsSection from "../components/HomePage/StatsSection";
import Services from "../components/HomePage/Services";
import WhyTrustUs from "../components/HomePage/WhyTrustUs";

const Home = () => {
  return (
    <>
      <Hero />
      <StatsSection />
      <Services />
      <WhyTrustUs />
    </>
  );
};

export default Home;
