import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {    
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`MongoDB connected: DB HOST!! :${connectionInstance.connection.host}`);

  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1);
  }
}

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (err) {
    console.error("Error closing connection:", err);
  }
};