import express from "express"
import { isAuthenticate } from "../../middleware/authMiddleware.js"
import { getUserById, getUserForSidebar } from "../../controllers/chat/userController.js"

const router = express.Router()
router.get("/", isAuthenticate, getUserForSidebar)
router.get("/user/:id", isAuthenticate, getUserById);


export default router
