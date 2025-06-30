import React from "react";
import logo from "../assets/logo.png"; // Import the logo image
import "./Navbar.css"; // Assuming you're separating CSS

const Navbar = () => (
  <nav className="navbar">
    <div className="logo-container">
      <img src={logo} alt="Logo" className="logo-image" />
      <div className="logo-text">ACOUSΓIC VISIΟNS</div>
    </div>
    <ul className="nav-links">
      <li className="active">Home</li>
      <li>Services</li>
      <li>Pages</li>
      <li>Contact us</li>
      <li>Blog</li>
    </ul>
    <input className="search-box" placeholder="search.." />
  </nav>
);

export default Navbar;
