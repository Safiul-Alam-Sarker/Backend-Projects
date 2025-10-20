import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema.Types

const MessageSchema = new mongoose.Schema({
    senderId: { type: ObjectId, ref: "User", required: true },
    receiverId: { type: ObjectId, ref: "User", required: true },
    text: { type: String },
    image: { type: String },
    seen: { type: Boolean, defalult: false }
}, { timestamps: true })

const Message = mongoose.model("Message", MessageSchema)
export default Message