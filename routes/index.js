const express = require('express');
const Post = require('../models/Post');
const Product = require('../models/Product');

const router = express.Router();

// Health check for tests
router.get('/health', (req, res) => res.status(200).send('OK'));

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    const products = await Product.find({ inStock: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();

    res.render('index', {
      title: 'Healthy Lifestyle Hub',
      posts,
      products
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
