const express = require('express');
const ContactMessage = require('../models/ContactMessage');

const router = express.Router();

// GET /contact
router.get('/', (req, res) => {
  res.render('contact/index', { title: 'Contact' });
});

// POST /contact
router.post('/', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message || message.trim().length < 10) {
      req.session.flash = { type: 'error', text: 'All fields required. Message must be at least 10 characters.' };
      return res.redirect('/contact');
    }

    await ContactMessage.create({ name, email, message });
    req.session.flash = { type: 'success', text: 'Message sent.' };
    res.redirect('/contact');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
