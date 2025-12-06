const express = require('express');
const Post = require('../models/Post');
const { ensureAuth } = require('../config/authMiddleware');

const router = express.Router();

// List all posts
router.get('/posts', async (req, res, next) => {
  try {
    const posts = await Post.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate('author', 'name')
      .lean();
    res.render('posts/list', { title: 'Blog', posts });
  } catch (err) {
    next(err);
  }
});

// New post form
router.get('/posts/new', ensureAuth, (req, res) => {
  res.render('posts/create', { title: 'New Blog Post' });
});

// Create post
router.post('/posts', ensureAuth, async (req, res, next) => {
  try {
    const { title, body, category, imageUrl } = req.body;
    if (!title || !body) {
      req.session.flash = { type: 'error', message: 'Title and content required.' };
      return res.redirect('/posts/new');
    }

    await Post.create({
      title,
      body,
      category,
      imageUrl,
      author: req.session.user.id
    });

    res.redirect('/posts');
  } catch (err) {
    next(err);
  }
});

// Edit form
router.get('/posts/:id/edit', ensureAuth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) return res.status(404).render('404');
    res.render('posts/edit', { title: 'Edit Post', post });
  } catch (err) {
    next(err);
  }
});

// Update post
router.put('/posts/:id', ensureAuth, async (req, res, next) => {
  try {
    const { title, body, category, imageUrl } = req.body;
    await Post.findByIdAndUpdate(req.params.id, {
      title,
      body,
      category,
      imageUrl
    });
    res.redirect('/posts');
  } catch (err) {
    next(err);
  }
});

// Detail
router.get('/posts/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name')
      .lean();
    if (!post) return res.status(404).render('404');
    res.render('posts/detail', { title: post.title, post });
  } catch (err) {
    next(err);
  }
});

// Delete
router.delete('/posts/:id', ensureAuth, async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/posts');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
