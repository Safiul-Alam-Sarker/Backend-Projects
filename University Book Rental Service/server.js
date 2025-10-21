import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./config/connectDB.js"
import userRouter from "./routers/userRouter.js"
import ownerRouter from "./routers/ownerRoutes.js"
import bookingRouter from "./routers/bookingRoutes.js"


// initialize express app
const app = express()

// connect with database
connectDB()

// middleware
app.use(cors({ origin: "http://localhost:5173" })) //this middleware allows frontend and backend to communicate even they are in different port
app.use(express.json()) //lets express parse incomng json data in the request body

app.get("/", (req, res) => {
    res.send("hello safiul")
})
app.use("/api/user", userRouter)
app.use("/api/owner", ownerRouter)
app.use("/api/bookings", bookingRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running ${PORT}`))
