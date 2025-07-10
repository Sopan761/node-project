const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create new category
router.post('/', async (req, res) => {
  try {
    const newCategory = new Category({ name: req.body.name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: 'Error creating category' });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

// READ Single Category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching category' });
  }
});

// UPDATE Category
router.put('/:id', async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Category not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating category' });
  }
});

// DELETE Category
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting category' });
  }
});
module.exports = router;
