import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import emailjs from "emailjs-com"; // ✅ EmailJS import
import "./ContactUs.css";
import FooterMiddle from "./FooterMiddle";

const API_BASE = "https://acoustic-vision.onrender.com/api";

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

  // ✅ Submit Form + Send Email via EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      mobile: formData.mobile,
      categories: formData.categories.map((c) => c.label).join(", "),
      products: formData.products.map((p) => p.label).join(", "),
      description: formData.description,
      additional: formData.additional,
      //to_email: "visionsacoustic@gmail.com",
    };
console.log("Sending params:", templateParams);
    emailjs
      .send(
        "service_jf8c7e6", // ✅ Your Service ID
        "template_qdpxpg8", // ✅ Your Template ID
        templateParams,
        "s2TJO3AEO9RPjzahf" // ✅ Your Public API Key
      )
      .then(
        (response) => {
          alert("✅ Message sent successfully!");
          console.log("SUCCESS!", response.status, response.text);
          handleCancel();
        },
        (err) => {
          alert("❌ Failed to send message, please try again.");
          console.error("FAILED...", err);
        }
      );
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
