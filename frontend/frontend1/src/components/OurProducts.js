import React, { useState } from "react";
import "./OurProducts.css";
import ProductCard from "../components/common/ProductCard";
import ourProductsBanner from "../assets/ourproducts.jpg"; // Banner image

const categories = [
  "All",
  "Lighting",
  "Sound",
  "Cameras",
  "Staging",
  "Screens",
];

const dummyProducts = [
  { id: 1, title: "Stage Lights", category: "Lighting", image: "/assets/product1.jpg" },
  { id: 2, title: "Wireless Microphone", category: "Sound", image: "/assets/product2.jpg" },
  { id: 3, title: "HD Camera", category: "Cameras", image: "/assets/product3.jpg" },
  { id: 4, title: "LED Screen", category: "Screens", image: "/assets/product1.jpg" },
  { id: 5, title: "PA Speaker", category: "Sound", image: "/assets/product2.jpg" },
  { id: 6, title: "Truss Structure", category: "Staging", image: "/assets/product3.jpg" },
];

const OurProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = dummyProducts.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="our-products-section">
      <div
        className="our-products-banner"
        style={{ backgroundImage: `url(${ourProductsBanner})` }}
      >
        <div className="banner-overlay">
          <h1>Our Products</h1>
          <p>Explore our professional-grade AV equipment for any event need.</p>
          <input
            type="text"
            placeholder="Search by name..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="category-filters">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} title={product.title} image={product.image} />
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default OurProducts;
