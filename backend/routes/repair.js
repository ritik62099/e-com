const express = require('express');
const router = express.Router();
const RepairRequest = require('../models/RepairRequest');

// POST a repair request
router.post('/', async (req, res) => {
  try {
    const newRequest = new RepairRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: 'Repair request submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving repair request', error: error.message });
  }
});

// Optional: GET all repair requests
router.get('/', async (req, res) => {
  try {
    const repairs = await RepairRequest.find().sort({ createdAt: -1 });
    res.json(repairs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch repair requests', error: error.message });
  }
});

module.exports = router;
