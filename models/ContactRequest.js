const mongoose = require('mongoose');

const contactRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  contactNumber: { type: String },
  productsInterested: [{ type: String }],
  message: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContactRequest', contactRequestSchema);
