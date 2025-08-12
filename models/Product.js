const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  imagePath: { type: String }, // optional
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
