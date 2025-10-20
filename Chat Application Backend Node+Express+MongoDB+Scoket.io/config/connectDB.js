import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => { console.log("mongodb server is connected") })
        await mongoose.connect(process.env.MONGOOSE_URL + "/chatapp")
    } catch (error) {
        console.log(error.message);

    }
}