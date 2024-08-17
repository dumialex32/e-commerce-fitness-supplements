import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";

// initialize environment variables
dotenv.config();

// initialize express
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// get products routes
app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

//  handling 404 and other errors
app.use(notFound);
app.use(errorHandler);

// connect to db
const init = async () => {
  await connectDB();
  const PORT: number | undefined = parseInt(process.env.PORT || "5000", 10);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

init();
