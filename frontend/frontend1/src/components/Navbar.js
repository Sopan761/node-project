import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="logo-container">
      <img src={logo} alt="Logo" className="logo-image" />
      <div className="logo-text">ACOUSΓIC VISIΟNS</div>
    </div>
    <ul className="nav-links">
      <li className="active">
        <NavLink to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</NavLink>
      </li>
      <li className="dropdown">
        Services<span className="dropdown-arrow">▼</span>
        <ul className="dropdown-content">
          <li>
            <NavLink to="/services/event-consulting" style={{ color: "inherit", textDecoration: "none" }}>
              Event Consulting
            </NavLink>
          </li>
          <li>
          <NavLink to="/services/audiovisual-Hire" style={{ color: "inherit", textDecoration: "none" }}>
              Audiovisual Hire
            </NavLink>
          </li>
          <li>
          <NavLink to="/services/eventProduction" style={{ color: "inherit", textDecoration: "none" }}>
              Event Production
            </NavLink>
            </li>
          <li>
            <NavLink to="/services/productionServices" style={{ color: "inherit", textDecoration: "none" }}>
              Production Services
            </NavLink>
          </li>
          <li>
          <NavLink to="/services/postProductionFilming" style={{ color: "inherit", textDecoration: "none" }}>
              Post Production & Filming
            </NavLink>
          </li>
          <li>
          <NavLink to="/services/technicalSupport" style={{ color: "inherit", textDecoration: "none" }}>
              Technical Support
          </NavLink>
          </li>
          <li>
          <NavLink to="/services/simultaneousInterpretation" style={{ color: "inherit", textDecoration: "none" }}>
              Simultaneous Interpretation
          </NavLink>
          </li>
        </ul>
      </li>
      <li><NavLink to="/Aboutus" style={{ color: "inherit", textDecoration: "none" }}>
              About Us
          </NavLink></li>
      <li><NavLink to="/OurProducts" style={{ color: "inherit", textDecoration: "none" }}>
              Products
          </NavLink></li>
      <li><NavLink to="/Contactus" style={{ color: "inherit", textDecoration: "none" }}>
              Contact Us
          </NavLink></li>
    </ul>
    <input className="search-box" placeholder="search.." />
  </nav>
);

export default Navbar;
