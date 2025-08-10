import React from "react";
import {
  FaRegCalendarAlt,
  FaPencilRuler,
  FaRegEye,
  FaMoneyBillAlt,
  FaTools,
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

const EventConsulting = () => {
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
  { title: "Event planning", icon: <FaRegCalendarAlt /> },
  { title: "Design ideation & creative input", icon: <FaPencilRuler /> },
  { title: "Monitoring the execution", icon: <FaRegEye /> },
  { title: "Working within a budget", icon: <FaMoneyBillAlt /> },
  { title: "Technical assistance", icon: <FaTools /> },
];
  const categories = [
    "Event planning",
    "Design ideation & creative input",
    "Monitoring the execution",
    "Working within a budget",
    "Technical assistance",
  ];

  const products = [
    { id: 1, title: "Event planning", image: product1 },
    { id: 2, title: "Design ideation & creative input", image: product2 },
    { id: 3, title: "Monitoring the execution", image: product3 },
    { id: 4, title: "Working within a budget", image: product1 },
    { id: 5, title: "Technical assistance", image: product2 },
  ];
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
        <h1>EVENT CONSULTING</h1>
        <h4>Bringing unique insights into the needs of today’s events.</h4>
        <p className="brand-text">
          At Acoustic Visions, we offer expert audiovisual consulting to shape unforgettable event experiences.
          From creative ideation to seamless execution, our team ensures every detail is technically sound and
          visually stunning. Let us help you connect with your audience through immersive AV solutions.
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

export default EventConsulting;
