import express from "express";
import {login, signup, logout, verifyEmail, forgotPassword, resetPassword,  deleteUserAccount, updateUserProfile, getUserProfile, checkAuth } from "../controllers/user.controller.js"
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../upload.js";

const router = express.Router();
router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", upload, signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword)
router.put("/edit", verifyToken, updateUserProfile)
router.delete("/deleteaccount", deleteUserAccount)
router.get("/getprofile", verifyToken, getUserProfile)
export default router