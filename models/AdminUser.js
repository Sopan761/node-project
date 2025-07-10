const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminUser', adminUserSchema);
