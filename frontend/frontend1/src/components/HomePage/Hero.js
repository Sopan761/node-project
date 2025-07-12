import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Hero = () => {
  const navigate = useNavigate(); // ✅ Hook must be used inside the component

  const handleProductClick = () => {
    navigate("/OurProducts"); // ✅ Navigate to OurProducts route
  };

  return (
    <section className="hero">
      <p className="tagline">AN AUDIO VISUAL COMPANY</p>
      <h1 className="hero-title">
        Amplify Your Events with Acoustic
        <br />
        Professional Events Made Easy
      </h1>
      <p className="hero-description">
        We help you launch, produce, and grow from scratch. From high-quality audio devices to lights and visuals, Acoustic is your one-stop solution to get heard worldwide.
      </p>
      <button className="hero-btn" onClick={handleProductClick}>Discover More →</button>
    </section>
  );
};

export default Hero;
