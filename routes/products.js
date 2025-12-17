// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /products  (list)
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('products/list', { title: 'Products', products });
  } catch (err) {
    next(err);
  }
});

// GET /products/:id  (detail)
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).render('404', { title: 'Not Found' });
    res.render('products/detail', { title: product.name, product });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
