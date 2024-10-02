import express from "express";
import {login, signup, logout, verifyEmail, forgotPassword, resetPassword,  deleteUserAccount, updateUserProfile, getUserProfile, checkAuth, getAllusers } from "../controllers/user.controller.js"
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../upload.js";
import jwt from "jsonwebtoken"
const router = express.Router();

const auth = (req, res, next) => {
    try {

      const authHeader = req.header('Authorization');
      if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
      }
      const token = authHeader.replace('Bearer ', '');
  
      jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret_key', (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
        }
  
        req.user = decoded;
        next();
      });
    } catch (error) {
      console.error('Authentication error: ', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };



router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", upload, signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword)
router.put("/edit", verifyToken, updateUserProfile)
router.delete("/deleteaccount",verifyToken, deleteUserAccount)
router.get("/getprofile", verifyToken, getUserProfile)
router.get('/getallusers', getAllusers)
export default router