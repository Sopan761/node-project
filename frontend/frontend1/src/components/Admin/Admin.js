import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const [view, setView] = useState("users");

  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@email.com" },
    { id: 2, name: "Bob", email: "bob@email.com" },
    { id: 3, name: "Charlie", email: "charlie@email.com" },
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: "Lighting" },
    { id: 2, name: "Sound" },
    { id: 3, name: "Visuals" },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: "LED Lights", category: "Lighting" },
    { id: 2, name: "Speakers", category: "Sound" },
  ]);

  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin123") {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setLoggedIn(false);
    navigate("/");
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData({});
    setEditId(null);
  };

  const handleAddOrUpdate = (type) => {
    if (editId !== null) {
      const updated = (type === "users" ? users : type === "categories" ? categories : products).map((item) =>
        item.id === editId ? { ...item, ...formData } : item
      );
      type === "users" ? setUsers(updated) : type === "categories" ? setCategories(updated) : setProducts(updated);
    } else {
      const newItem = { id: Date.now(), ...formData };
      if (type === "users") setUsers([...users, newItem]);
      if (type === "categories") setCategories([...categories, newItem]);
      if (type === "products") setProducts([...products, newItem]);
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
  };

  const handleDelete = (id, type) => {
    const filtered = (type === "users" ? users : type === "categories" ? categories : products).filter((item) => item.id !== id);
    type === "users" ? setUsers(filtered) : type === "categories" ? setCategories(filtered) : setProducts(filtered);
    resetForm();
  };

  const renderSection = () => {
    const data = view === "users" ? users : view === "categories" ? categories : products;

    return (
      <>
        <h2>{view === "users" ? "Manage Users" : view === "categories" ? "Manage Categories" : "Manage Products"}</h2>
        <form
          className="crud-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddOrUpdate(view);
          }}
        >
          {view === "users" && (
            <>
              <input name="name" placeholder="Name" value={formData.name || ""} onChange={handleFormChange} required />
              <input name="email" placeholder="Email" value={formData.email || ""} onChange={handleFormChange} required />
            </>
          )}

          {view === "categories" && (
            <input name="name" placeholder="Category Name" value={formData.name || ""} onChange={handleFormChange} required />
          )}

          {view === "products" && (
            <>
              <input name="name" placeholder="Product Name" value={formData.name || ""} onChange={handleFormChange} required />
              <select
                name="category"
                value={formData.category || ""}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <div className="form-actions">
            <button type="submit">{editId ? "Update" : "Add"}</button>
            <button type="button" onClick={resetForm} className="cancel-btn">Cancel</button>
          </div>
        </form>

        <ul className="item-list">
          {data.map((item) => (
            <li key={item.id}>
              <span>
                {view === "products"
                  ? `${item.name} (${item.category})`
                  : item.name + (item.email ? ` (${item.email})` : "")}
              </span>
              <div className="actions">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id, view)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  if (!loggedIn) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            name="username"
            placeholder="Username"
            onChange={(e) => setCredentials((p) => ({ ...p, username: e.target.value }))}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setCredentials((p) => ({ ...p, password: e.target.value }))}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-portal">
      <aside className="admin-sidenav">
        <h3>Admin Panel</h3>
        <button onClick={() => setView("users")}>Users</button>
        <button onClick={() => setView("products")}>Products</button>
        <button onClick={() => setView("categories")}>Categories</button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>
      <main className="admin-main">{renderSection()}</main>
    </div>
  );
};

export default Admin;
