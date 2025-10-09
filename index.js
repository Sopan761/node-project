const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');   // ✅ import path

const app = express();

// CORS - allow only trusted origins and handle preflight
const allowedOrigins = [
  process.env.CLIENT_URL,                     // e.g. https://acousticvisions.online (set in Render)
  "https://acousticvisions.online",           // explicit fallback
  "https://acoustic-vision.onrender.com",     // allow requests originating from backend domain if needed
].filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  // If no origin (server-to-server, mobile apps, curl), allow it
  if (!origin) {
    return next();
  }

  // If origin is allowed, set CORS headers for this request
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    // If you use cookies / sessions cross-site, keep this true and ensure allowedOrigins is not '*'
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});


app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Test route
// app.get('/', (req, res) => {
//   res.send('Backend is working!');
// });

// ✅ Routes
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// ✅ Create default admin (only for testing/demo)
app.get('/create-default-admin', async (req, res) => {
  const AdminUser = require('./models/AdminUser');
  const bcrypt = require('bcryptjs');
  const hash = await bcrypt.hash('admin123', 10);

  const admin = new AdminUser({
    name: 'Main Admin',
    email: 'admin@example.com',
    passwordHash: hash
  });

  await admin.save();
  res.send('Default admin created');
});

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "frontend/frontend1/build");
  
  // Serve static files
  app.use(express.static(frontendPath));

  // For any route not matched by API, send index.html
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ✅ Use Render's PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
