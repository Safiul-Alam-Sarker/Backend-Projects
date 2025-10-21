import jwt from "jsonwebtoken"
import User from "../models/User.js"

const protect = async (req, res, next) => {


    try {
        // Get token from Authorization header
        const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        // Verify token using secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID (from decoded token payload)
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Attach user to request object for later use
        req.user = user;

        // Continue to the next middleware or controller
        next();


    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
}

export default protect