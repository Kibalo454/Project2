const express = require('express');
const ContactMessage = require('../models/ContactMessage');

const router = express.Router();

router.get('/contact', (req, res) => {
  res.render('contact/contact', { title: 'Contact Us' });
});

router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      req.session.flash = { type: 'error', message: 'All fields are required.' };
      return res.redirect('/contact');
    }

    if (message.length < 10) {
      req.session.flash = {
        type: 'error',
        message: 'Message should be at least 10 characters.'
      };
      return res.redirect('/contact');
    }

    await ContactMessage.create({ name, email, message });
    res.render('contact/thanks', { title: 'Thank You', name });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
