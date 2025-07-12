import React from "react";
import "./ProductCard.css"; // Create this CSS next

const ProductCard = ({ image, title, buttonText = "View Details" }) => {
  return (
    <div className="service-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <button className="learn-btn">{buttonText}</button>
    </div>
  );
};

export default ProductCard;
