import React from "react";
import {
  FaTools,
  FaLightbulb,
  FaCogs,
  FaStar,
  FaLayerGroup,
  FaGripLines,
  FaCubes,
  FaPaintRoller,
  FaSnowflake,
  FaShapes,
  FaTree,
} from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../components/HomePage/Services.css";
import "./EventConsulting.css";
import ProductCard from "../common/ProductCard";

import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";

import event1 from "../../assets/event1.jpg";
import event2 from "../../assets/event2.jpg";
import event3 from "../../assets/event3.jpg";
import event4 from "../../assets/eventConsulting.jpg";

const ProductionServices = () => {
   // Inside your component
  const scrollRef = useRef(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  
  useEffect(() => {
    const checkOverflow = () => {
      const el = scrollRef.current;
      setShowScrollButtons(el && el.scrollWidth > el.clientWidth);
    };
  
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);
  const expertiseIcons = [
    { title: "Stage and backdrop fabrication", icon: <FaTools /> },
    { title: "Gold glitter confetti blast", icon: <FaSnowflake /> },
    { title: "Intelligent LED lighting systems", icon: <FaLightbulb /> },
    { title: "Gold glitter stage flooring", icon: <FaStar /> },
    { title: "Set decor", icon: <FaPaintRoller /> },
    { title: "Underlit stages", icon: <FaGripLines /> },
    { title: "Acrylic set fascia panels", icon: <FaLayerGroup /> },
    { title: "Stage-Dex systems", icon: <FaCogs /> },
    { title: "Trussing & rigging", icon: <FaCubes /> },
    { title: "Themed ambience", icon: <FaShapes /> },
    { title: "Outdoor truss rigging systems", icon: <FaTree /> },
  ];

  const products = expertiseIcons.map((item, index) => ({
    id: index + 1,
    title: item.title,
    image: [product1, product2, product3][index % 3],
  }));
useEffect(() => {
  const checkOverflow = () => {
    const el = scrollRef.current;
    setShowScrollButtons(el && el.scrollWidth > el.clientWidth);
  };

  checkOverflow();
  window.addEventListener("resize", checkOverflow);
  return () => window.removeEventListener("resize", checkOverflow);
}, []);

const scrollLeft = () => {
  scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
};

const scrollRight = () => {
  scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
};
  return (
    <section className="event-consulting-section">
      <div className="event-header">
        <h1>STAGE AND SOUND EQUIPMENT RENTAL</h1>
        <h4>Bringing your storyboards to life.</h4>
        <p className="brand-text">
          At Acoustic Visions, we bring your stage to life with innovative design and engineering.
          From fabrication and rigging to intelligent lighting and ambience, we handle every detail
          with precision and passion.
        </p>
      </div>

      {/* Asymmetric Collage Grid */}
      <div className="event-collage-grid">
        <img src={event1} alt="event1" />
        <img src={event2} alt="event2" />
        <img src={event3} alt="event3" />
        <img src={event4} alt="event4" />
      </div>

      <div className="expertise-icon-carousel-section">
  <h3>Expertise in following fields</h3>
  <div className="carousel-wrapper-with-arrows">
    {showScrollButtons && (
      <button className="scroll-button left" onClick={scrollLeft}>
        <FaChevronLeft />
      </button>
    )}

    <div className="expertise-icon-carousel scrollable" ref={scrollRef}>
      {expertiseIcons.map((item, index) => (
        <div className="expertise-icon-item" key={index}>
          <div className="icon">{item.icon}</div>
          <span>{item.title}</span>
        </div>
      ))}
    </div>

    {showScrollButtons && (
      <button className="scroll-button right" onClick={scrollRight}>
        <FaChevronRight />
      </button>
    )}
  </div>
</div>


      {/* Products Section */}
      <div className="products-section">
        <div className="services-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductionServices;
