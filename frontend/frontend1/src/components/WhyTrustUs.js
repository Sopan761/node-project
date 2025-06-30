import React from "react";
import "./WhyTrustUs.css";
import chooseus from "../assets/chooseus.jpg";
const WhyTrustUs = () => {
  return (
    <section className="trust-section">
      <div className="trust-image">
        <img src={chooseus} alt="Why Choose Acoustic Visions" />
        <div className="badge">
          <span className="badge-icon">🏆</span>
          <div>
            <p className="badge-title">Best Podcaster</p>
            <p className="badge-subtext">Awards</p>
          </div>
        </div>
      </div>

      <div className="trust-content">
        <p className="trust-subtitle">WHY CHOOSE US</p>
        <h2>
          Why Creators Trust <br />
          Acoustic Visions for Their AV Journey
        </h2>

        <div className="trust-point">
          <span className="check-icon">✔</span>
          <div>
            <p className="point-title">Proven Results</p>
            <p className="point-desc">
              We've helped dozens of creators launch successful shows, grow their audience,
              and build loyal communities.
            </p>
          </div>
        </div>

        <div className="trust-point">
          <span className="check-icon">✔</span>
          <div>
            <p className="point-title">Expertise and Experience</p>
            <p className="point-desc">
              Years of excellence in sound design, editing, and delivering immersive AV experiences.
            </p>
          </div>
        </div>

        <div className="trust-point">
          <span className="check-icon">✔</span>
          <div>
            <p className="point-title">Data-Driven Growth</p>
            <p className="point-desc">
              We leverage analytics to improve audience engagement and content performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;
