import React, { useRef, useEffect, useState } from "react";
import {
  FaImage,
  FaMusic,
  FaMicrophoneAlt,
  FaWaveSquare,
  FaShapes,
  FaArchive,
  FaPenNib,
  FaMagic,
  FaFont,
  FaAdjust,
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

const PostProductionFilming = () => {
  const scrollRef = useRef(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const expertiseIcons = [
    { title: "Picture editing", icon: <FaImage /> },
    { title: "Music editing", icon: <FaMusic /> },
    { title: "Sound Editing", icon: <FaMicrophoneAlt /> },
    { title: "Sound design and mixing", icon: <FaWaveSquare /> },
    { title: "Graphics integration", icon: <FaShapes /> },
    { title: "Archiving", icon: <FaArchive /> },
    { title: "Composing and recording the score", icon: <FaPenNib /> },
    { title: "Adding visual special effects", icon: <FaMagic /> },
    { title: "Titles design", icon: <FaFont /> },
    { title: "Color grading", icon: <FaAdjust /> },
  ];

  const products = expertiseIcons.map((item, idx) => ({
    id: idx + 1,
    title: item.title,
    image: idx % 3 === 0 ? product1 : idx % 3 === 1 ? product2 : product3,
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
        <h1>PRODUCTION-READY AV SERVICES</h1>
        <h4>Comprehensive behind-the-scenes expertise.</h4>
        <p className="brand-text">
          At Acoustic Visions, we provide end-to-end AV production services that power unforgettable events from the ground up. Our team blends technical precision with creative insight—ensuring every element, from concept to execution, is flawlessly delivered. Trust us to create immersive audiovisual experiences that resonate with your audience.</p>
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

export default PostProductionFilming;
