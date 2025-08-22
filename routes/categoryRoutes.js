/*
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
*/

const express = require('express');
const multer = require('multer');
const Category = require('../models/Category');

const router = express.Router();

// Multer setup (store image in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CREATE Category with optional image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    let newCategory = new Category({
      name,
      image: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,
    });

    await newCategory.save();

    res.status(201).json({
      ...newCategory._doc,
      image: newCategory.image?.data
        ? `data:${newCategory.image.contentType};base64,${newCategory.image.data.toString('base64')}`
        : null,
    });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ error: 'Error creating category' });
  }
});

// GET All Categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();

    const formatted = categories.map(c => ({
      ...c._doc,
      image: c.image?.data
        ? `data:${c.image.contentType};base64,${c.image.data.toString('base64')}`
        : null,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

// GET Single Category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ error: 'Category not found' });

    res.json({
      ...category._doc,
      image: category.image?.data
        ? `data:${category.image.contentType};base64,${category.image.data.toString('base64')}`
        : null,
    });
  } catch (err) {
    console.error('Error fetching category:', err);
    res.status(500).json({ error: 'Error fetching category' });
  }
});

// UPDATE Category (with optional image change)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    const updateData = { name };

    if (req.file) {
      updateData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) return res.status(404).json({ error: 'Category not found' });

    res.json({
      ...updated._doc,
      image: updated.image?.data
        ? `data:${updated.image.contentType};base64,${updated.image.data.toString('base64')}`
        : null,
    });
  } catch (err) {
    console.error('Error updating category:', err);
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
    console.error('Error deleting category:', err);
    res.status(500).json({ error: 'Error deleting category' });
  }
});

module.exports = router;
