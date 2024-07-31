import mongoose from "mongoose";

// connect db

const connectDB = async (): Promise<void> => {
  const mongoURI: string | undefined = process.env.MONGO_URI;

  if (!mongoURI) throw new Error("MongoDB URI string not provided");

  const attemptDelay = 3000; // 3 seconds
  const maxAttempts: number = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const conn = await mongoose.connect(mongoURI);
      console.log(`MongoDB connected to: ${conn.connection.host}`);
      return;
    } catch (err) {
      if (err instanceof Error) {
        console.error(
          `Error connecting to MongoDB (attempt ${attempt}/${maxAttempts}): ${err.message}`
        );
      } else {
        console.error(
          `Error connecting to MongoDB (attempt ${attempt}/${maxAttempts})`
        );
      }
    }

    if (attempt === maxAttempts) {
      process.exit(1);
    }

    await new Promise((resolve) => setTimeout(resolve, attemptDelay));
  }
};

export default connectDB;

// db shutdown
const shutdownDB = async (): Promise<void> => {
  try {
    console.log("Closing MongoDB connection");
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
    process.exit(0); // Exit with code 0 (success)
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error during MongoDB disconnection: ${err.message}`);
    } else {
      console.error("Error during MongoDB disconnection");
    }
    process.exit(1); // Exit with code 1 (failure)
  }
};

process.on("SIGINT", shutdownDB); // When the process receives a SIGINT signal (e.g., pressing Ctrl+C), shutdownDB will be called
process.on("SIGTERM", shutdownDB); // When the process receives a SIGTERM signal (e.g., during system shutdown or from process management tools), shutdownDB will be called
