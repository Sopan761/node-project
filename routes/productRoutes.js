const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// CREATE Product
router.post('/', async (req, res) => {
  try {
    const { title, description, categoryId, imagePath } = req.body;
    const newProduct = new Product({ title, description, categoryId, imagePath });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error creating product' });
  }
});

// GET All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// GET Single Product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categoryId', 'name');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching product' });
  }
});

// UPDATE Product
router.put('/:id', async (req, res) => {
  try {
    const { title, description, categoryId, imagePath } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, categoryId, imagePath },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating product' });
  }
});

// DELETE Product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting product' });
  }
});

module.exports = router;
