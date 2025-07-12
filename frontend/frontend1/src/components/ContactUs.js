import React, { useState } from "react";
import "./ContactUs.css";
import FooterMiddle from "./FooterMiddle";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    product: "",
    description: "",
    additional: "",
  });

  const products = [
    "Event Consulting",
    "Audiovisual Hire",
    "Event Production",
    "Production Services",
    "Post Production & Filming",
    "Technical Support",
    "Simultaneous Interpretation",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Future: Send data to backend
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      product: "",
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
            <label>Product</label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
            >
              <option value="">Select a product</option>
              {products.map((product, i) => (
                <option key={i} value={product}>
                  {product}
                </option>
              ))}
            </select>
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
