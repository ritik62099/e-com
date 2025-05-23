const express = require('express');
const router = express.Router();
const SellProduct = require('../models/SellProduct');
const auth = require('../middlewares/auth'); // JWT middleware

// ➕ Add a product for selling
router.post('/', auth, async (req, res) => {
  const { name, price, category, condition, rating, image } = req.body;

  try {
    const newProduct = new SellProduct({
      userId: req.user.userId,
      name,
      price,
      category,
      condition,
      rating,
      image
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product listed successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Failed to list product', error: err.message });
  }
});

// 📦 Get all products listed by current user
router.get('/my-products', auth, async (req, res) => {
  try {
    const products = await SellProduct.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});

// Get all products (public route for buyers)
router.get('/', async (req, res) => {
  try {
    const products = await SellProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});


module.exports = router;
