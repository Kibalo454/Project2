const express = require('express');
const Product = require('../models/Product');
const { ensureAdmin } = require('../config/authMiddleware');

const router = express.Router();

// List all products
router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    res.render('products/list', { title: 'Product Catalog', products });
  } catch (err) {
    next(err);
  }
});

// New product (admin)
router.get('/products/new', ensureAdmin, (req, res) => {
  res.render('products/create', { title: 'New Product' });
});

// Create product (admin)
router.post('/products', ensureAdmin, async (req, res, next) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;
    if (!name || !description || !price) {
      req.session.flash = { type: 'error', message: 'Name, description, price required.' };
      return res.redirect('/products/new');
    }

    await Product.create({
      name,
      description,
      price,
      category,
      imageUrl
    });

    res.redirect('/products');
  } catch (err) {
    next(err);
  }
});

// Detail
router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).render('404');
    res.render('products/detail', { title: product.name, product });
  } catch (err) {
    next(err);
  }
});

// Edit (admin)
router.get('/products/:id/edit', ensureAdmin, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).render('404');
    res.render('products/edit', { title: 'Edit Product', product });
  } catch (err) {
    next(err);
  }
});

// Update (admin)
router.put('/products/:id', ensureAdmin, async (req, res, next) => {
  try {
    const { name, description, price, category, imageUrl, inStock } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      category,
      imageUrl,
      inStock: !!inStock
    });
    res.redirect('/products');
  } catch (err) {
    next(err);
  }
});

// Delete (admin)
router.delete('/products/:id', ensureAdmin, async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
