const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  //imagePath: String, // e.g., "/uploads/products/img1.jpg"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
