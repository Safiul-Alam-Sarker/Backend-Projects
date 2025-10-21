// Function to check availability of book for a given Date

import Book from "../models/Book.js";
import Booking from "../models/Booking.js";

const checkAvailability = async (book, pickUpDate, returnDate) => {
    const bookings = await Booking.find({
        book,
        pickUpDate: { $lte: returnDate },
        returnDate: { $gte: pickUpDate }

    })
    return bookings.length === 0;


}


export const checkAvailabilityofBook = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body
        // fetch all available books for the given location
        const books = await Book.find({ location, isAvailable: true })
        // check book availability for the given date range using promise
        const availableBooksPromises = books.map(async (book) => {
            const isAvailable = await checkAvailability(book._id, pickupDate, returnDate); // store result
            return { ...book._doc, isAvailable }
        })

        let availableBooks = await Promise.all(availableBooksPromises);
        availableBooks = availableBooks.filter(book => book.isAvailable == true)
        res.json({ success: true, availableBooks })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });


    }
}

// api to create booking

export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { book, pickupDate, returnDate } = req.body

        const isAvailable = await checkAvailability(book, pickupDate, returnDate)

        if (!isAvailable) {
            return res.json({ success: false, message: "Book is not available" })

        }
        const bookData = await Book.findById(book)

        // calculate price based on pickupDate and returnDate
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
        const price = bookData.pricePerDay * noOfDays;

        await Booking.create({ book, owner: bookData.owner, user: _id, pickupDate, returnDate, price })
        res.json({ success: true, message: "booking created" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to list userBooking
export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user
        const bookings = await Booking.find({ user: _id }).populate("book").sort({ createdAt: -1 })
        res.json({ success: true, bookings })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to get owner bookings
export const getOwnerBoookings = async (req, res) => {
    try {
        const { _id } = req.user
        if (req.user.role !== "owner") {
            return res.json({ success: false, message: "Unauthorized" })
        }
        const bookings = await Booking.find({ owner: _id })
            .populate("book user", "-user.password")
            .sort({ createdAt: -1 });
        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to change booking status

export const changeBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user
        const { booking_id, status } = req.body
        const booking = await Booking.findById(booking_id)

        if (booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" })

        }
        booking.status = status;
        await booking.save()

        res.json({ success: true, message: "status updated" })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}