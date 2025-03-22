const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Organizer = require('../models/Organizer');
const Participant = require('../models/Participant');

const authMiddleware = (role) => async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;
    if (role === 'admin') {
      user = await Admin.findById(decoded.id);
    } else if (role === 'organizer') {
      user = await Organizer.findById(decoded.id);
    } else if (role === 'participant') {
      user = await Participant.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    req.role = role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;