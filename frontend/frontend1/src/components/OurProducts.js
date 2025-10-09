import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./OurProducts.css";
import ProductCard from "../components/common/ProductCard";
import ourProductsBanner from "../assets/ourproducts.jpg";
import api from "../api";
const OurProducts = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromQuery = queryParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
    }
  }, [categoryFromQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await api.get("/api/categories");
        const categoryList = categoryRes.data.map((cat) => ({
          id: cat._id,
          name: cat.name,
          image: cat.image, // ✅ category images
        }));
        setCategories(categoryList);

        const productRes = await api.get("/api/products");
        setProducts(productRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryName = product.categoryId?.name || null;
    const matchesCategory =
      !selectedCategory || categoryName === selectedCategory;
    const matchesSearch = product.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="our-products-section">
      <div
        className="our-products-banner"
        style={{ backgroundImage: `url(${ourProductsBanner})` }}
      >
        <div className="banner-overlay">
          <h1>{selectedCategory ? "OUR SERVICES" : "SERVICE CATALOGUE"}</h1>
          <p>
            {selectedCategory
              ? `Explore all products under "${selectedCategory}"`
              : "Explore our professional-grade AV equipment for any event need."}
          </p>
          {selectedCategory && (
            <input
              type="text"
              placeholder="Search by name..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* Back Button */}
      {selectedCategory && (
        <div className="back-btn-container">
          <button className="filter-btn" onClick={() => setSelectedCategory(null)}>
            ⬅ Back to All Services
          </button>
        </div>
      )}

      {loading ? (
        <p className="loading">Loading...</p>
      ) : selectedCategory ? (
        // ✅ Show Products
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                title={product.title}
                image={product.image}
                description={product.description}
  category={product.categoryId?.name}
              />
            ))
          ) : (
            <p className="no-results">No products found.</p>
          )}
        </div>
      ) : (
        // ✅ Show Categories
        <div className="products-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <img
                src={cat.image}
                alt={cat.name}
                className="category-image"
              />
              <h3>{cat.name}</h3>
              <button
                className="filter-btn"
                onClick={() => setSelectedCategory(cat.name)}
              >
                View Services
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OurProducts;
