import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
        <div className="logo-text">ACOUSΓIC VISIΟNS</div>
      </div>

      {/* Hamburger icon */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" className="nav-link" onClick={handleLinkClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/Aboutus" className="nav-link" onClick={handleLinkClick}>
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/OurProducts" className="nav-link" onClick={handleLinkClick}>
            Service Catalogue
          </NavLink>
        </li>

        {/* Dropdown */}
        <li
          className={`dropdown ${dropdownOpen ? "open" : ""}`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Service Offerings <span className={`dropdown-arrow ${dropdownOpen ? "rotate" : ""}`}>▼</span>
          <ul className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
            <li>
              <NavLink to="/services/event-consulting" className="nav-link" onClick={handleLinkClick}>
                Event Consulting
              </NavLink>
            </li>
            <li>
              <NavLink to="/services/audiovisual-Hire" className="nav-link" onClick={handleLinkClick}>
                Audio-Visual Rental
              </NavLink>
            </li>
            <li>
              <NavLink to="/services/eventProduction" className="nav-link" onClick={handleLinkClick}>
                Event Production Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/services/productionServices" className="nav-link" onClick={handleLinkClick}>
                Stage And Sound Engineering
              </NavLink>
            </li>
            <li>
              <NavLink to="/services/postProductionFilming" className="nav-link" onClick={handleLinkClick}>
                Production-Ready AV Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/services/technicalSupport" className="nav-link" onClick={handleLinkClick}>
                Technical Support
              </NavLink>
            </li>
            <li>
              <NavLink to="/services/simultaneousInterpretation" className="nav-link" onClick={handleLinkClick}>
                Complete AV Solutions
              </NavLink>
            </li>
          </ul>
        </li>

        <li>
          <NavLink to="/Contactus" className="nav-link" onClick={handleLinkClick}>
            Contact Us
          </NavLink>
        </li>
        <li className="search-item">
          <input className="search-box" placeholder="search.." />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
