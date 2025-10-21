import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const bookSchema = new mongoose.Schema({
    owner: { type: ObjectId, ref: "User" },
    publication: { type: String, required: true },
    publishedYear: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: [String], required: true },
    Condition: { type: String, required: true, enum: ["New", "Used", "Moderate", "Bad"] },
    location: { type: String, required: true },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    pricePerDay: { type: Number, required: true },


}, { timestamps: true })

const Book = mongoose.model("Book", bookSchema)
export default Book