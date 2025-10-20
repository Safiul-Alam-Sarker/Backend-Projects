import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
import getToken from "../utils/getToken.js";
import fs from "fs"
import imageKit from "../config/imageKit.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, bio } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "missing details" })

        }
        const user = await User.findOne({ email })
        if (user) {
            return res.json({ success: false, message: "user already exist" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({ name, email, password: hashedPassword })

        const token = getToken(User._id)
        res.json({ success: true, userData: newUser, token, message: "Account created Successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(401).json('registration is not successful')

    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userData = await User.findOne({ email })
        if (!userData) {
            res.json({ success: false, message: "invalid credential" })

        }
        const isPasswordCorrect = await bcrypt.compare(password, userData.password)
        if (!isPasswordCorrect) {
            res.json({ success: false, message: "invalid credential" })

        }
        const token = getToken(userData._id)
        res.json({ success: true, userData, token, message: "login successful" })
    } catch (error) {
        console.log(error.message);
        res.status(404).json('registration is not successful')
    }

}


// controller to check if user is authenticated

export const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user })
}


// controller to update user image

export const updateProfile = async (req, res) => {

    try {
        console.log(req.user);

        const { _id } = req.user
        const { bio, name } = req.body
        const image = req.file; //multer puts uploaded file in req.file

        let imageUrl


        if (image) {
            const fileBuffer = fs.readFileSync(image.path)
            const response = await imageKit.upload({
                file: fileBuffer,
                fileName: image.originalname,
                folder: '/chatuser'
            });
            imageUrl = response.url; //imageKit return url
            fs.unlinkSync(image.path)//remove local temp file
        }
        // Update user in DB
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                ...(imageUrl && { image: imageUrl }),
                ...(bio && { bio }),
                ...(name && { name }),

            },
            { new: true }
        )
        res.json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
