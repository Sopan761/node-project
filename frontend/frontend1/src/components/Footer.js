import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./Footer.css";
import footerbanner from "../assets/footer-banner.jpg";

const Footer = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleContactClick = () => {
    navigate("/Contactus"); // ✅ Navigate to ContactUs route
  };
  return (
    <footer className="footer-section">
      <div className="footer-top">
        <div className="footer-text">
          <p className="footer-subtitle">CONTACT US</p>
          <h2>Start Your AV Journey with ACOUSΓIC VISIΟNS</h2>
          <button className="contact-btn" onClick={handleContactClick}>
            Contact Us →
          </button>
        </div>
        <div className="footer-image">
          <img src={footerbanner} alt="Collaboration" />
        </div>
      </div>

      <div className="footer-middle">
        <div className="footer-brand">
          <h3>ACOUSΓIC VISIΟNS</h3>
          <p>
            Helping brands and creators tell their story through immersive
            audio and striking visuals — from concept to final production.
          </p>
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
        <p>© 2025 ACOUSΓIC VISIΟNS</p>
        <div className="footer-policy-links">
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
