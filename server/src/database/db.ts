import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export default async function connectToDatabase() {
  try {
    if (!MONGO_URI) {
      throw new Error("Mongo URI is not defined");
    }
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
