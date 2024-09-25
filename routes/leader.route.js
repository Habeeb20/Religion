import express from "express"
import { login, signup,logout,verifyEmail,forgotPassword,resetPassword,deleteUserAccount,updateUserProfile,getUserProfile, checkAuth } from "../controllers/leader.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
import upload from "../upload.js";

const leaderrouter = express.Router();
leaderrouter.get("/lcheck-auth", verifyToken, checkAuth)
leaderrouter.post("/lsignup", upload, signup)
leaderrouter.post("/llogin", login)
leaderrouter.post('/llogout', logout);
leaderrouter.post('/lverify-email', verifyEmail)
leaderrouter.post('/lforgot-password', forgotPassword)
leaderrouter.post('/lreset-password/:token', resetPassword)
leaderrouter.put("/ledit", verifyToken, updateUserProfile)
leaderrouter.delete("/deleteacounte", verifyToken, deleteUserAccount)
leaderrouter.get("/getprofile", verifyToken, getUserProfile)

export default leaderrouter
