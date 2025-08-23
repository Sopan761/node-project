const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");

const router = express.Router();

// Multer setup (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CREATE Product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, categoryId } = req.body;

    if (!title || !description || !categoryId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let newProduct = new Product({
      title,
      description,
      categoryId,
      image: req.file
        ? { data: req.file.buffer, contentType: req.file.mimetype }
        : undefined,
    });

    await newProduct.save();
    newProduct = await Product.findById(newProduct._id).populate("categoryId", "name");

    res.status(201).json({
      ...newProduct._doc,
      image: newProduct.image?.data
        ? `data:${newProduct.image.contentType};base64,${newProduct.image.data.toString("base64")}`
        : null,
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Error creating product" });
  }
});

// GET All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId", "name");
    const formatted = products.map((p) => ({
      ...p._doc,
      image: p.image?.data
        ? `data:${p.image.contentType};base64,${p.image.data.toString("base64")}`
        : null,
    }));
    res.json(formatted);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Error fetching products" });
  }
});

// UPDATE Product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, categoryId } = req.body;
    const updateData = { title, description, categoryId };

    if (req.file) {
      updateData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    let updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate("categoryId", "name");

    if (!updated) return res.status(404).json({ error: "Product not found" });

    res.json({
      ...updated._doc,
      image: updated.image?.data
        ? `data:${updated.image.contentType};base64,${updated.image.data.toString("base64")}`
        : null,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Error updating product" });
  }
});

// DELETE Product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
