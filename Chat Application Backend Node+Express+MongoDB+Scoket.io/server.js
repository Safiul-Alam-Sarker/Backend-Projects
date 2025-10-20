import express from "express"
import cors from "cors"
import "dotenv/config"
import { connectDB } from "./config/connectDB.js"
import http from "http"
import userRoutes from "./routers/UserRoutes.js"
import messageRoutes from "./routers/messageRoutes.js"
import { Server } from "socket.io"

// creating express app and  http server
const app = express()
const server = http.createServer(app)

// initialize socket.io server
export const io = new Server(server, {
    cors: { origin: "*" }
})
// store online users
export const userSocketMap = {} //{userid:socketID}

// socket,io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("user connected", userId);

    if (userId) userSocketMap[userId] = socket.id;

    // emit online users to all connected clinet
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))


    })


})
// connectDb
await connectDB()

// middlewares
app.use(cors())
app.use(express.json({ limit: "4mb" })) //max upload 4mb data in application



// routes
app.get("/", (req, res) => {
    res.send("hello safiul alam")
})

app.use("/api/user", userRoutes)
app.use("/api/messages", messageRoutes)

// port connection
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`server is running in port: ${PORT}`))