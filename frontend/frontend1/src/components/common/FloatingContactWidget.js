import React from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "./FloatingContactWidget.css";

const FloatingContactWidget = () => {
  const navigate = useNavigate();

  const whatsappNumber = "9495939988";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="floating-widget">
      {/* WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp"
      >
        <FaWhatsapp />
      </a>

      {/* Email */}
      <button
        onClick={() => navigate("/ContactUs")}
        className="floating-btn email"
      >
        <FaEnvelope />
      </button>
    </div>
  );
};

export default FloatingContactWidget;
