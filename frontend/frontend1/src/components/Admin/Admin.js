import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const API_BASE = "https://acoustic-vision.onrender.com/api";

const Admin = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [view, setView] = useState("users");

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);

  // ✅ Utility: compress + resize image before upload
  const resizeImage = (file, maxWidth = 600, maxHeight = 400, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // keep ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height *= maxWidth / width));
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width *= maxHeight / height));
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(new File([blob], file.name, { type: "image/jpeg" }));
            },
            "image/jpeg",
            quality
          );
        };

        img.onerror = (err) => reject(err);
      };
    });
  };

  const loadData = async (section) => {
    try {
      let res, data;
      if (section === "users") {
        res = await fetch(`${API_BASE}/admin`);
        data = await res.json();
        setUsers(data);
      } else if (section === "categories") {
        res = await fetch(`${API_BASE}/categories`);
        data = await res.json();
        setCategories(data);
      } else if (section === "products") {
        const [catRes, prodRes] = await Promise.all([
          fetch(`${API_BASE}/categories`),
          fetch(`${API_BASE}/products`),
        ]);
        const [catData, prodData] = await Promise.all([
          catRes.json(),
          prodRes.json(),
        ]);
        setCategories(catData);
        setProducts(prodData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loggedIn) loadData(view);
  }, [view, loggedIn]);

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
    setImageFile(null);
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

      let body;
      let options = { method };

      if (type === "products" || type === "categories") {
        body = new FormData();
        Object.keys(formData).forEach((key) => body.append(key, formData[key]));
        if (imageFile) body.append("image", imageFile);
        options.body = body;
      } else {
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(formData);
      }

      const res = await fetch(url, options);
      const saved = await res.json();

      if (res.ok) {
        await loadData(type);
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
    setImageFile(null);
    setEditId(item._id);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`${API_BASE}/${type}/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok) {
        await loadData(type);
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
              <input
                name="name"
                placeholder="Name"
                value={formData.name || ""}
                onChange={handleFormChange}
                required
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleFormChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleFormChange}
              />
            </>
          )}

          {view === "categories" && (
            <>
              <input
                name="name"
                placeholder="Category Name"
                value={formData.name || ""}
                onChange={handleFormChange}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  if (e.target.files[0]) {
                    const compressed = await resizeImage(e.target.files[0]);
                    setImageFile(compressed);
                  }
                }}
              />
            </>
          )}

          {view === "products" && (
            <>
              <input
                name="title"
                placeholder="Product Name"
                value={formData.title || ""}
                onChange={handleFormChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description || ""}
                onChange={handleFormChange}
              />
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
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  if (e.target.files[0]) {
                    const compressed = await resizeImage(e.target.files[0]);
                    setImageFile(compressed);
                  }
                }}
              />
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
                  ? `${item.title} (${item.categoryId?.name || "No Category"})`
                  : item.name + (item.email ? ` (${item.email})` : "")}
              </span>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name || item.title}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    marginLeft: "10px",
                    borderRadius: "6px",
                  }}
                />
              )}
              <div className="actions">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id, type)}>
                  Delete
                </button>
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
            onChange={(e) =>
              setCredentials((p) => ({ ...p, username: e.target.value }))
            }
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setCredentials((p) => ({ ...p, password: e.target.value }))
            }
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
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>
      <main className="admin-main">{renderSection()}</main>
    </div>
  );
};

export default Admin;
