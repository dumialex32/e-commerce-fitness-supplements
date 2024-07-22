import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI: string | undefined = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MongoDB URI connection string not specified");
    }
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB: connected to ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
