import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/HomePage/Services.css";
import "./EventConsulting.css";
import ProductCard from "../common/ProductCard";
import axios from "axios";

import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";

import event1 from "../../assets/event1.jpg";
import event2 from "../../assets/event2.jpg";
import event3 from "../../assets/event3.jpg";
import event4 from "../../assets/eventConsulting.jpg";

const AudiovisualHire = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://acoustic-vision.onrender.com/api/categories")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else if (res.data && res.data.categories) {
          setCategories(res.data.categories);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  const products = categories.map((cat, index) => {
    const fallbackImage =
      index % 3 === 0 ? product1 : index % 3 === 1 ? product2 : product3;
    return {
      id: cat._id || index + 1,
      title: cat.name || "Unnamed Category",
      image: cat.image && cat.image.trim() !== "" ? cat.image : fallbackImage,
    };
  });

  const handleCategoryClick = (categoryName) => {
    navigate(`/OurProducts?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="event-consulting-section">
      <div className="event-header">
        <h1>AUDIO-VISUAL RENTAL</h1>
        <h4>Cutting-Edge Equipment. Expertly Delivered.</h4>
        <p className="brand-text">
          At Acoustic Visions, we provide comprehensive audiovisual rentals, backed by expert consulting to craft unforgettable event experiences. From concept to execution, our team ensures every detail is flawlessly integrated—technically precise and visually striking. Engage your audience with immersive AV solutions tailored to elevate any event.
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

      {/* Product Cards Section */}
      <div className="products-section">
        <div className="services-grid">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleCategoryClick(product.title)}
              style={{ cursor: "pointer" }}
            >
              <ProductCard image={product.image} title={product.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudiovisualHire;
