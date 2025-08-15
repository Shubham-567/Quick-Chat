import mongoose from "mongoose";

// functions to connect to mongodb database
export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "chat-app",
    });
  } catch (error) {
    console.log("Failed to connect to database");
    console.error(error);
  }
};
