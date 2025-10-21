import express from "express"
const userRouter = express.Router()

import { loginUser, registerUser, getUserData } from "../controllers/userController.js"
import protect from "../middleware/auth.js"

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/data", protect, getUserData);


export default userRouter

