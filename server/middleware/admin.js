const auth = require('./auth');

module.exports = function(req, res, next) {
  // First authenticate the user
  auth(req, res, () => {
    // Check if user is admin
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
  });
}; 