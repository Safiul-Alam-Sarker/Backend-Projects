// get all users except the logged in user

import imageKit from "../config/imageKit.js";
import Message from "../models/MessageModel.js";
import User from "../models/UserModel.js";
import { io, userSocketMap } from "../server.js"

export const getUserForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password")

        // count number of messages not seen
        const unseenMessages = {}
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({ senderId: user._id, receiverId: userId, seen: false })
            if (messages.length > 0) {
                unseenMessages[user._id] = messages.length;
            }


        })
        await Promise.all(promises);
        res.json({ success: true, users: filteredUsers, unseenMessages })


    } catch (error) {

        console.log(error.message);
        res.json({ success: false, message: error.message })


    }
}


// get all messages for selected user

export const getMessages = async (req, res) => {
    try {
        const { id: selectedUserId } = req.params;
        const myId = req.user._id
        const messages = await Message.find({
            $or: [
                { senderId: myId, revceiverId: selectedUserId },
                { senderId: selectedUserId, revceiverId: myId },

            ]
        })
        await Message.updateMany({ senderId: selectedUserId, receiverId: myId }, { seen: true });
        res.json({ success: true, messages })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })



    }


}

// api to mark message as seen using message id

export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id, { seen: true })
        res.json({ success: true })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })


    }
}


// send message to selected User
export const sendMessage = async (req, res) => {
    try {
        const { text } = req.body
        const receiverId = req.params.id
        const senderId = req.user._id

        const image = req.file;
        let imageUrl;
        if (image) {
            const fileBuffer = FileSystem.readFileSync(image.path)
            const response = await imageKit.upload({
                file: fileBuffer,
                fileName: image.originalname,
                folder: "/chatiamge"

            })
            imageUrl = response.url;
            FileSystem.unlink(image.path)
        }
        const newMessage = Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        // emit the new message to the receiver socket 
        const receiverSocketId = userSocketMap[receiverId]
        if (receiverSocketId) {
            io.to(reveiverSocketId).emit("newMessage", newMessage)
        }

        res.json({ success: true, newMessage })

    } catch (error) {

    }
}