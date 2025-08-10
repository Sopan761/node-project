import React, { useRef, useEffect, useState } from "react";
import {
  FaHeadphones,
  FaBroadcastTower,
  FaMicrophone,
  FaVoteYea,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

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

const SimultaneousInterpretation = () => {
  const scrollRef = useRef(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const expertiseIcons = [
    { title: "Sound-proof booths", icon: <FaHeadphones /> },
    { title: "Infrared interpretation equipment", icon: <FaBroadcastTower /> },
    { title: "Push-to-talk discussion and voting systems", icon: <FaVoteYea /> },
    { title: "Radio frequency equipment", icon: <FaMicrophone /> },
  ];

  const products = expertiseIcons.map((item, idx) => ({
    id: idx + 1,
    title: item.title,
    image: idx % 2 === 0 ? product1 : idx % 3 === 0 ? product3 : product2,
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
        <h1>Simultaneous Interpretation</h1>
        <h4>Bridging the language gap for seamless communication</h4>
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

      {/* Expertise Icon Carousel */}
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

export default SimultaneousInterpretation;
