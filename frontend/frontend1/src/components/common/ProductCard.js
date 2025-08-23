import React, { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ image, title, description, category }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="service-card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <button className="learn-btn" onClick={() => setShowPopup(true)}>
          View Details
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()} // prevent close on inner click
          >
            <h2>{title}</h2>
            <p><strong>Category:</strong> {category}</p>
            <p className="popup-description"><strong>Description:</strong> {description}</p>
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
