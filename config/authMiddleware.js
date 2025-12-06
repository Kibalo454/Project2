function ensureAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  req.session.flash = { type: 'error', message: 'You must be logged in.' };
  return res.redirect('/login');
}

function ensureGuest(req, res, next) {
  if (req.session && req.session.user) {
    return res.redirect('/');
  }
  return next();
}

function ensureAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  req.session.flash = { type: 'error', message: 'Admin access only.' };
  return res.redirect('/');
}

module.exports = { ensureAuth, ensureGuest, ensureAdmin };
