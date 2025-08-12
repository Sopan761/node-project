import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const API_BASE = "http://localhost:5000/api";

const Admin = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [view, setView] = useState("users");

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  // Load data for current view
  useEffect(() => {
    if (!loggedIn) return;
    const loadData = async () => {
      try {
        let res, data;
        if (view === "users") {
          res = await fetch(`${API_BASE}/admin`);
          data = await res.json();
          setUsers(data);
        } else if (view === "categories") {
          res = await fetch(`${API_BASE}/categories`);
          data = await res.json();
          setCategories(data);
        } else if (view === "products") {
          res = await fetch(`${API_BASE}/products`);
          data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, [view, loggedIn]);

  // Login check (for now: still local)
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

  const handleAddOrUpdate = async (type) => {
    try {
      let url = `${API_BASE}/${type}`;
      let method = "POST";
      if (editId) {
        url += `/${editId}`;
        method = "PUT";
      }
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const saved = await res.json();

      if (res.ok) {
        if (type === "admin") {
          setUsers(editId ? users.map((u) => (u._id === saved._id ? saved : u)) : [...users, saved]);
        } else if (type === "categories") {
          setCategories(editId ? categories.map((c) => (c._id === saved._id ? saved : c)) : [...categories, saved]);
        } else if (type === "products") {
          setProducts(editId ? products.map((p) => (p._id === saved._id ? saved : p)) : [...products, saved]);
        }
        resetForm();
      } else {
        alert(saved.error || "Error saving");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item._id);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`${API_BASE}/${type}/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok) {
        if (type === "admin") {
          setUsers(users.filter((u) => u._id !== id));
        } else if (type === "categories") {
          setCategories(categories.filter((c) => c._id !== id));
        } else if (type === "products") {
          setProducts(products.filter((p) => p._id !== id));
        }
      } else {
        alert(result.error || "Error deleting");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderSection = () => {
    let data;
    let type;
    if (view === "users") {
      data = users;
      type = "admin";
    } else if (view === "categories") {
      data = categories;
      type = "categories";
    } else {
      data = products;
      type = "products";
    }

    return (
      <>
        <h2>
          {view === "users"
            ? "Manage Users"
            : view === "categories"
            ? "Manage Categories"
            : "Manage Products"}
        </h2>
        <form
          className="crud-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddOrUpdate(type);
          }}
        >
          {view === "users" && (
            <>
              <input name="name" placeholder="Name" value={formData.name || ""} onChange={handleFormChange} required />
              <input name="email" placeholder="Email" value={formData.email || ""} onChange={handleFormChange} required />
              <input type="password" name="password" placeholder="Password" onChange={handleFormChange} />
            </>
          )}

          {view === "categories" && (
            <input name="name" placeholder="Category Name" value={formData.name || ""} onChange={handleFormChange} required />
          )}

          {view === "products" && (
            <>
              <input name="title" placeholder="Product Name" value={formData.title || ""} onChange={handleFormChange} required />
              <textarea name="description" placeholder="Description" value={formData.description || ""} onChange={handleFormChange} />
              <select
                name="categoryId"
                value={formData.categoryId || ""}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <div className="form-actions">
            <button type="submit">{editId ? "Update" : "Add"}</button>
            <button type="button" onClick={resetForm} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>

        <ul className="item-list">
          {data.map((item) => (
            <li key={item._id}>
              <span>
                {view === "products"
                  ? `${item.title} (${item.category?.name || "No Category"})`
                  : item.name + (item.email ? ` (${item.email})` : "")}
              </span>
              <div className="actions">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id, type)}>Delete</button>
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
