import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-top">
        <div className="footer-text">
          <p className="footer-subtitle">CONTACT US</p>
          <h2>Start Your AV Journey with ACOUSΓIC VISIΟNS</h2>
          <button className="contact-btn">Contact Us →</button>
        </div>
        <div className="footer-image">
          <img src="/assets/footer-banner.png" alt="Collaboration" />
        </div>
      </div>

      <div className="footer-middle">
        <div className="footer-brand">
          <h3>ACOUSΓIC VISIΟNS</h3>
          <p>
            Helping brands and creators tell their story through immersive
            audio and striking visuals — from concept to final production.
          </p>
          <div className="footer-links">
            <a href="#">Overview</a>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Careers</a>
            <a href="#">Help</a>
            <a href="#">Privacy</a>
          </div>
        </div>

        <div className="newsletter">
          <p className="newsletter-heading">
            Get AV tips, industry insights, and updates in your inbox.
          </p>
          <div className="newsletter-input">
            <input type="email" placeholder="Email" />
            <button>Sign Up</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 ACOUSΓIC VISIΟNS • Design by Moaan Studio</p>
        <div className="footer-policy-links">
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
