import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes";

// initialize environment variables
dotenv.config();

// initialize express
const app = express();

// get products route
app.use("/api/products", productRoutes);

// connect to db
const init = async () => {
  await connectDB();
  const PORT: number | undefined = parseInt(process.env.PORT || "5000", 10);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

init();
