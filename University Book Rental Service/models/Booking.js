import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

const BookingSchema = new mongoose.Schema({
    book: {
        type: ObjectId,
        ref: "Book",
        required: true,

    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true,

    },
    owner: {
        type: ObjectId,
        ref: "User",
        requied: true
    },
    pickupDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', "confirmed", "cancelled"],
        default: "pending"
    },
    price: {
        type: Number,
        reuired: true,
    }


}, { timestamps: true })

const Booking = mongoose.model("Booking", BookingSchema)
export default Booking