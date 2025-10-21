import express from "express"
import { changeBookingStatus, checkAvailabilityofBook, createBooking, getOwnerBoookings, getUserBookings } from "../controllers/boookingController.js";
import protect from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityofBook)
bookingRouter.post("/create", protect, createBooking)
bookingRouter.get("/user", protect, getUserBookings)
bookingRouter.get("/owner", protect, getOwnerBoookings)
bookingRouter.post("/change-status", protect, changeBookingStatus)

export default bookingRouter;
