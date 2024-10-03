import Admin from '../models/admin.model.js';
import express from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import {User} from '../models/user.model.js';
import Leader from '../models/leaders.model.js';
import {  updateLeaderStatus } from '../controllers/leader.controller.js';
import { updateUserStatus } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import bcrypt from "bcrypt"
const adminrouter = express.Router();
import jwt from "jsonwebtoken"

// Routes for admin to update user and leader status
adminrouter.put('/users/status', verifyToken, adminAuth,  updateUserStatus);
adminrouter.put('/leaders/status', verifyToken, adminAuth, updateLeaderStatus );

// Get all users
adminrouter.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all leaders
adminrouter.get('/leaders', adminAuth, async (req, res) => {
  try {
    const leaders = await Leader.find({});
    res.json(leaders);
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a user
adminrouter.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a leader
adminrouter.delete('/leaders/:id', adminAuth, async (req, res) => {
  try {
    await Leader.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Leader deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Admin Registration
adminrouter.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
  
    try {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });
  
      await newAdmin.save();
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Error registering admin', error });
    }
  });
  
  // Admin Login
  adminrouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: 'Admin not found' });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
    //   if (!isMatch) {
    //     console.log("incorrect password")
    //     return res.status(400).json({ message: 'Invalid credentials' });
    //   }
  
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  });

export default adminrouter;
