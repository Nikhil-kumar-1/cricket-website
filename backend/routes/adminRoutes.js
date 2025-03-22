const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected admin route
router.get('/dashboard', authMiddleware('admin'), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

module.exports = router;