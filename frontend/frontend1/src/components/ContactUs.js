import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select"; // ✅ new
import "./ContactUs.css";
import FooterMiddle from "./FooterMiddle";

const API_BASE = "http://localhost:5000/api";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    categories: [],
    products: [],
    description: "",
    additional: "",
  });

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch(`${API_BASE}/categories`),
          fetch(`${API_BASE}/products`),
        ]);
        const [catData, prodData] = await Promise.all([
          catRes.json(),
          prodRes.json(),
        ]);
        setCategories(catData || []);
        setProducts(prodData || []);
      } catch (error) {
        console.error("Error fetching categories/products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!formData.categories || formData.categories.length === 0) return products;
    const selected = new Set(formData.categories.map((c) => c.value));
    return products.filter((p) => selected.has(p.categoryId?._id));
  }, [products, formData.categories]);

  // Format options for react-select
  const categoryOptions = categories.map((c) => ({
    value: c._id,
    label: c.name,
  }));

  const productOptions = [
    ...(filteredProducts.length > 0
      ? [{ value: "__ALL__", label: "All Products" }]
      : []),
    ...filteredProducts.map((p) => ({
      value: p._id,
      label: `${p.title} (${p.categoryId?.name || ""})`,
    })),
  ];

  const handleCategoriesChange = (selected) => {
    setFormData((prev) => {
      const selectedIds = selected || [];
      const allowedProductIds = new Set(
        products
          .filter(
            (p) =>
              selectedIds.length === 0 ||
              selectedIds.some((cat) => cat.value === p.categoryId?._id)
          )
          .map((p) => p._id)
      );
      const filteredChosenProducts = prev.products.filter((id) =>
        allowedProductIds.has(id.value)
      );
      return { ...prev, categories: selectedIds, products: filteredChosenProducts };
    });
  };

  const handleProductsChange = (selected) => {
    if (selected?.some((s) => s.value === "__ALL__")) {
      // replace with all
      const all = filteredProducts.map((p) => ({
        value: p._id,
        label: `${p.title} (${p.categoryId?.name || ""})`,
      }));
      setFormData((prev) => ({ ...prev, products: all }));
      return;
    }
    setFormData((prev) => ({ ...prev, products: selected || [] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      ...formData,
      categories: formData.categories.map((c) => c.value),
      products: formData.products.map((p) => p.value),
    });
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      categories: [],
      products: [],
      description: "",
      additional: "",
    });
  };

  return (
    <div className="contact-us-container">
      <section className="contact-us-section">
        <div className="contact-form-container">
          <h2>Contact Us</h2>
          <p className="form-subtext">Let us know your requirements</p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label>Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label>From our Service Catalogue</label>
              <Select
                isMulti
                options={categoryOptions}
                value={formData.categories}
                onChange={handleCategoriesChange}
                placeholder="Select one or more categories..."
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            <div className="form-row">
              <label>Optional Products</label>
              <Select
                isMulti
                options={productOptions}
                value={formData.products}
                onChange={handleProductsChange}
                placeholder="Select products (or All)..."
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            <div className="form-row">
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-row">
              <label>Additional Details</label>
              <textarea
                name="additional"
                rows="3"
                value={formData.additional}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      <FooterMiddle />
    </div>
  );
};

export default ContactUs;
