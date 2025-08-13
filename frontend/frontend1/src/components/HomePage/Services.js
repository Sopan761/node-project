import React from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";
import EVENTCONSULTING from "../../assets/EVENT_CONSULTING.jpg";
import AUDIOVISUALRENTAL from "../../assets/AUDIO-VISUALRENTAL.jpg";
import EVENTPRODUCTIONSERVICES from "../../assets/EVENTPRODUCTIONSERVICES.jpg";
import PRODUCTIONREADYAVSERVICES from "../../assets/PRODUCTIONREADYAVSERVICES.jpg";
import TECHNICALSUPPORT from "../../assets/TECHNICALSUPPORT.jpg";
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    { id: 1, title: "EVENT CONSULTING", image: EVENTCONSULTING, path: "/services/event-consulting" },
    { id: 2, title: "AUDIO-VISUAL RENTAL", image: AUDIOVISUALRENTAL, path: "/services/audiovisual-Hire" },
    { id: 3, title: "EVENT PRODUCTION SERVICES", image: EVENTPRODUCTIONSERVICES, path: "/services/eventProduction" },
    { id: 4, title: "STAGE AND SOUND ENGINEERING", image: product1, path: "/services/productionServices" },
    { id: 5, title: "PRODUCTION-READY AV SERVICES", image: PRODUCTIONREADYAVSERVICES, path: "/services/postProductionFilming" },
    { id: 6, title: "TECHNICAL SUPPORT", image: TECHNICALSUPPORT, path: "/services/technicalSupport" },
    { id: 7, title: "COMPLETE AV SOLUTIONS, SEAMLESSLY DELIVERED", image: product3, path: "/services/simultaneousInterpretation" },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

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
          <div
            key={service.id}
            className="service-card"
            onClick={() => handleCardClick(service.path)}
            style={{ cursor: "pointer" }}
          >
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <button
              className="learn-btn"
              onClick={(e) => {
                e.stopPropagation(); // prevent double navigation
                handleCardClick(service.path);
              }}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
