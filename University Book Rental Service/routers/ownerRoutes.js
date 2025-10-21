// routes/ownerRoutes.js
import express from "express";
import protect from "../middleware/auth.js";
import { changeRoleToOwner, addBook, getOwnerBooks, deleteBook, toggleBookAvailability, getDashboardData, updateUserImage } from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

// Change user role to owner
ownerRouter.post("/change-role", protect, changeRoleToOwner);

// Add a new book (with optional image upload)
ownerRouter.post("/add-book", protect, upload.single("image"), addBook);

ownerRouter.get("/books", protect, getOwnerBooks);

ownerRouter.get("/toggle-book", protect, toggleBookAvailability);
ownerRouter.get("/delete-book", protect, deleteBook);

ownerRouter.get("/dashboard", protect, getDashboardData)
ownerRouter.post("/update-image", protect, upload.single("image"), updateUserImage)


export default ownerRouter;
