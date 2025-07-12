import React from "react";
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

const AudiovisualHire = () => {
  const categories = [
    "Audio reinforcement systems",
    "Line array sound systems",
    "Mega projection systems",
    "Projection video solutions & camera equipment",
    "Multiple presentation and video switching systems",
    "Widescreen watchout systems",
    "Plasmas & PDPs",
    "Interpretation and conference systems",
    "IT & office equipment",
    "Business centre equipment",
  ];

  // Loop through categories and assign images cyclically
  const products = categories.map((title, index) => ({
    id: index + 1,
    title,
    image: index % 3 === 0 ? product1 : index % 3 === 1 ? product2 : product3,
  }));

  return (
    <section className="event-consulting-section">
      <div className="event-header">
        <h1>AUDIO-VISUAL HIRE</h1>
        <h4>EXTENSIVE, STATE-OF-THE-ART EQUIPMENT INVENTORY</h4>
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
        <h3>EQUIPMENT AVAILABLE FOR HIRE</h3>
        </div>
      {/* Product Cards Section for AV Hire Categories */}
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

export default AudiovisualHire;
