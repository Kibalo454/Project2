const express = require('express');
const User = require('../models/User');
const { ensureGuest } = require('../config/authMiddleware');

const router = express.Router();

// Register form
router.get('/register', ensureGuest, (req, res) => {
  res.render('auth/register', { title: 'Register' });
});

// Register submit
router.post('/register', ensureGuest, async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      req.session.flash = { type: 'error', message: 'All fields are required.' };
      return res.redirect('/register');
    }

    if (password !== confirmPassword) {
      req.session.flash = { type: 'error', message: 'Passwords do not match.' };
      return res.redirect('/register');
    }

    const existing = await User.findOne({ email });
    if (existing) {
      req.session.flash = { type: 'error', message: 'Email already registered.' };
      return res.redirect('/register');
    }

    const user = new User({ name, email, password });
    await user.save();

    req.session.user = { id: user._id, name: user.name, role: user.role };
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

// Login form
router.get('/login', ensureGuest, (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

// Login submit
router.post('/login', ensureGuest, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      req.session.flash = { type: 'error', message: 'Email and password required.' };
      return res.redirect('/login');
    }

    const user = await User.findOne({ email });
    if (!user) {
      req.session.flash = { type: 'error', message: 'Invalid credentials.' };
      return res.redirect('/login');
    }

    const match = await user.comparePassword(password);
    if (!match) {
      req.session.flash = { type: 'error', message: 'Invalid credentials.' };
      return res.redirect('/login');
    }

    req.session.user = { id: user._id, name: user.name, role: user.role };
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

module.exports = router;
