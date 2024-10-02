// middleware/adminAuth.js

import jwt from 'jsonwebtoken';
import User from '../models/admin.model.js'; 

export const adminAuth = async (req, res, next) => {
  let token = req.header('authorization');

  token = token.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    

    // Check if the user is an admin
    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied, admin only' });
    }

    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};
