import React from "react";
import "./Services.css";
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
const Services = () => {
  const services = [
    { id: 1, title: "Sound Design", image: product1 },
    { id: 2, title: "Podcast Production", image: product2 },
    { id: 3, title: "Audio Branding", image: product3 },
    { id: 4, title: "Studio Setup & Acoustics", image: product1 },
    { id: 5, title: "Voiceover Recording", image: product2 },
    { id: 6, title: "Live Audio & Visuals", image: product3 },
  ];

  return (
    <section className="services-section">
      <div className="services-header">
        <div>
          <p className="subtitle">OUR SERVICES</p>
          <h2>
            Powering Immersive Experiences <br />
            with Audio-Visual Precision
          </h2>
        </div>
        <div className="discover-section">
          <p>We offer 25+ tailored audio-visual solutions</p>
          <button className="discover-btn">Discover More →</button>
        </div>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <button className="learn-btn">Learn More</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
