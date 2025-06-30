import React, { useState, useEffect } from "react";
import "./StatsSection.css";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const images = [img1, img2, img3];

const StatsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="stats-section">
      <h2 className="section-title">Event Production Like Never Before</h2>

      <div className="image-slider-wrapper">
        {images.map((img, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          >
            {/* ==== Option 1: Overlay bottom-centered stat cards ==== */}
            {index === currentIndex && (
              <div className="stats-overlay-bottom">
                <div className="stat-card">
                  <span className="icon">🎤</span>
                  <h3>500+</h3>
                  <p>Events Hosted</p>
                </div>
                <div className="stat-card">
                  <span className="icon">👥</span>
                  <h3>1M+</h3>
                  <p>Audience Reached</p>
                </div>
                <div className="stat-card">
                  <span className="icon">🌟</span>
                  <h3>4.9/5</h3>
                  <p>Client Rating</p>
                </div>
              </div>
            )}

            {/* ==== Option 2: Right-side stacked stat cards (commented) ==== */}
            {/* {index === currentIndex && (
              <div className="stats-overlay-right">
                <div className="stat-card">
                  <span className="icon">🎤</span>
                  <h3>500+</h3>
                  <p>Events Hosted</p>
                </div>
                <div className="stat-card">
                  <span className="icon">👥</span>
                  <h3>1M+</h3>
                  <p>Audience Reached</p>
                </div>
                <div className="stat-card">
                  <span className="icon">🌟</span>
                  <h3>4.9/5</h3>
                  <p>Client Rating</p>
                </div>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
