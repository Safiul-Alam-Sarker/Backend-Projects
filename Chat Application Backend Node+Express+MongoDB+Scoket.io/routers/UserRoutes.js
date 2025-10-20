import express from "express"
import { checkAuth, login, registerUser, updateProfile } from "../controllers/UserController.js"
import { protectRoute } from "../middleware/auth.js"
import upload from "../middleware/multer.js"

const userRoutes = express.Router()

userRoutes.post("/register", registerUser)
userRoutes.post("/login", login)
userRoutes.get("/check", protectRoute, checkAuth)
userRoutes.put("/updateProfile", protectRoute, upload.single("image"), updateProfile)

export default userRoutes