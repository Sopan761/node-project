const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const AdminUser = require('../models/AdminUser');

// Login (email + password check)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await AdminUser.findOne({ email });
  if (!admin) return res.status(401).json({ error: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

  res.json({
    message: 'Login successful',
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email
    }
  });
});

// Change password
router.put('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  const admin = await AdminUser.findOne({ email });
  if (!admin) return res.status(404).json({ error: 'User not found' });

  const match = await bcrypt.compare(oldPassword, admin.passwordHash);
  if (!match) return res.status(401).json({ error: 'Old password incorrect' });

  const newHash = await bcrypt.hash(newPassword, 10);
  admin.passwordHash = newHash;
  await admin.save();

  res.json({ message: 'Password updated successfully' });
});

// Create a new admin user (only after login)
router.post('/create', async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await AdminUser.findOne({ email });
  if (existing) return res.status(400).json({ error: 'Email already exists' });

  const hash = await bcrypt.hash(password, 10);
  const newAdmin = new AdminUser({ name, email, passwordHash: hash });

  await newAdmin.save();
  res.status(201).json({ message: 'Admin user created' });
});

module.exports = router;
