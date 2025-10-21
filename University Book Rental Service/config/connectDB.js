import mongoose from "mongoose"

const connectDB = async () => {

    try {
        mongoose.connection.on("connected", () => console.log("mongodb database is running"))
        await mongoose.connect(`${process.env.MONGODB_URL}/practice`)
    } catch (error) {

        console.log(error.message)
    }

}

export default connectDB;