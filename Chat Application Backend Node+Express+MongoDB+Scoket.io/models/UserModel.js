import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, default: "" },
    bio: { type: String, default: "" }


}, { timestamps: true })

const User = mongoose.model("User", UserSchema)
export default User
