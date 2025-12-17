// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET /posts  (list)
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render('posts/list', { title: 'Blog Posts', posts });
  } catch (err) {
    next(err);
  }
});

// GET /posts/:id  (detail)
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).render('404', { title: 'Not Found' });
    res.render('posts/detail', { title: post.title, post });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
