import React from "react";
import "./Footer.css";

const FooterMiddle = () => {
  return (
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
  );
};

export default FooterMiddle;
