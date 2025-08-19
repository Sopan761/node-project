import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./OurProducts.css";
import ProductCard from "../components/common/ProductCard";
import ourProductsBanner from "../assets/ourproducts.jpg";

const OurProducts = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromQuery = queryParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(["All"]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync category from query param immediately
  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
    }
  }, [categoryFromQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryRes = await axios.get("http://localhost:5000/api/categories");
        const categoryList = categoryRes.data.map((cat) => ({
          id: cat._id,
          name: cat.name,
        }));
        setCategories(["All", ...categoryList.map((c) => c.name)]);

        // Fetch products (backend should return imagePath as Base64 string if available)
        const productRes = await axios.get("http://localhost:5000/api/products");
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
      selectedCategory === "All" || categoryName === selectedCategory;
    const matchesSearch = product.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="our-products-section">
      {/* Banner */}
      <div
        className="our-products-banner"
        style={{ backgroundImage: `url(${ourProductsBanner})` }}
      >
        <div className="banner-overlay">
          <h1>SERVICE CATALOG</h1>
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

      {/* Category filter */}
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

      {/* Products grid */}
      {loading ? (
        <p className="loading">Loading products...</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                title={product.title}
                image={product.imagePath} // This is now Base64 string from backend
              />
            ))
          ) : (
            <p className="no-results">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OurProducts;
