// routes/departments.js
const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const Product = require('../models/Products');

// GET /api/departments - Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/departments/:id - Get department by ID
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ error: 'Department not found' });
    res.json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/departments/:id/products - Get products for a specific department
router.get('/:id/products', async (req, res) => {
  try {
    const products = await Product.find({ department: req.params.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
