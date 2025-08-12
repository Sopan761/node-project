const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// ✅ Allow your React/Angular frontend to access API
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// ✅ Routes
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// ✅ Create default admin
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

const PORT = 5000; 
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
