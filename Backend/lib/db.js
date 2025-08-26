import mongoose from "mongoose";

let isConnected = false;

// functions to connect to mongodb database
export const connectDB = async () => {
  if (isConnected) return;

  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "chat-app",
    });

    isConnected = mongoose.connection.readyState === 1;
    // console.log(mongoose.connection);
    // console.log(mongoose.connection.readyState);

    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed: ", error);
    throw error;
  }
};
