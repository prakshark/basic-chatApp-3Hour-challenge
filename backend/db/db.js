import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
    try {
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri);
    } catch (error) {
        console.log(`Failed to connect to mongoDB`);
    }
}