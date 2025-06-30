import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsSection from "./components/StatsSection"; // NEW
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import "./App.css";
import WhyTrustUs from "./components/WhyTrustUs";

const App = () => (
  <div>
    <Navbar />
    <Hero />
    <StatsSection />
    <Services />
    <WhyTrustUs/>
    <Footer />
  </div>
);

export default App;
