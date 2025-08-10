//require('dotenv').config(); // Load .env variables

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connection MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Basic route (optional)
 app.get('/', (req, res) => {
   res.send('Backend is working!');
 });

//Routes

//category CRUD
const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);

//products  CRUD
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);


//Adding first user as db is empty 
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

//admin CRUD
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

//contactRoutes (enquiry)
const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contact', contactRoutes);

const PORT = 5000; 
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
