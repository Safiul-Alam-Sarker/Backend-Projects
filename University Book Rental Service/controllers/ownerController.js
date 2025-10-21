// controllers/ownerController.js
import fs from "fs";
import imageKit from "../config/imageKit.js";
import Book from "../models/Book.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" }, { new: true });
        res.json({ success: true, message: "Now you can list books" });
    } catch (error) {
        console.log("Error changing role:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Add Book with working ImageKit upload
export const addBook = async (req, res) => {
    try {
        console.log("req.file:", req.file);
        console.log("req.body:", req.body);

        const { _id } = req.user;
        const bookData = JSON.parse(req.body.bookData);
        const imageFile = req.file;

        let imageUrl = null;

        if (imageFile) {
            const fileBuffer = fs.readFileSync(imageFile.path);

            // Upload to ImageKit
            const response = await imageKit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: "/rentedbook",
            });

            // ✅ Use the URL returned by ImageKit
            imageUrl = response.url;

            // Delete temporary file from uploads/
            fs.unlinkSync(imageFile.path);
        }

        // Save book in DB with image URL
        const newBook = await Book.create({ ...bookData, owner: _id, image: imageUrl });
        console.log(imageUrl);


        res.json({
            success: true,
            message: "Book added successfully",
            book: newBook,
        });
    } catch (error) {
        console.log("Error adding book:", error.message);
        res.json({ success: false, message: error.message });
    }
};


// api list  of owner books
export const getOwnerBooks = async (req, res) => {
    try {
        const { _id } = req.user;
        const books = await Book.find({ owner: _id })
        res.json({ success: true, books })
    } catch (error) {
        console.log("Error adding book:", error.message);
        res.json({ success: false, message: error.message });
    }
}


// api to toggle book availablility
export const toggleBookAvailability = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookId } = req.body;

        const book = await Book.findById(bookId)

        // checking is book belongs to the user
        if (book.owner.toString() !== _id.toString()) {
            return res.json({ success: false, messagge: "Unauthorized" })
        }
        book.isAvailable = !book.isAvailable
        await book.save()
        res.json({ success: true, message: "availability toggled" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to delete the book
export const deleteBook = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookId } = req.body;

        const book = await Book.findById(bookId)

        // checking is book belongs to the user
        if (book.owner.toString() !== _id.toString()) {
            return res.json({ success: false, messagge: "Unauthorized" })
        }
        book.owner = null;
        book.isAvailable = false;

        await book.save()
        res.json({ success: true, message: "car is removed" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to get dashboard data

export const getDashboardData = async (req, res) => {
    try {
        const { _id, role } = req.user;
        if (role !== "owner") {
            return res.json({ success: false, message: "unauthorized" })
        }

        const books = await Book.find({ owner: _id })
        const bookings = await Booking.find({ owner: _id })
            .populate("book")
            .sort({ createdAt: -1 }); // works with Mongoose query

        const pendingBookings = await Booking.find({ owner: _id, staus: "pending" })
        const completedBookings = await Booking.find({ owner: _id, staus: "confimed" })

        // calculate monthly revenue

        const monthlyRevenue = bookings.slice().filter(booking => booking.status === "confirmed").reduce((acc, booking) => acc + booking.price, 0)

        const dashboardData = {
            totalBooks: books.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue,

        }

        res.json({ success: true, dashboardData })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to update user image

export const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user

        const imageFile = req.file;
        let imageUrl = null;

        if (imageFile) {
            const fileBuffer = fs.readFileSync(imageFile.path);

            // Upload to ImageKit
            const response = await imageKit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: "/users",
            });

            // ✅ Use the URL returned by ImageKit
            imageUrl = response.url;

            // Delete temporary file from uploads/
            fs.unlinkSync(imageFile.path);
        }

        await User.findByIdAndUpdate(_id, { image: imageUrl })
        res.json({ success: true, message: "user image is updated" })



    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}