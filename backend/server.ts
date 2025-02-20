import path from "path";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";
import {
  generalRateLimit,
  userRateLimit,
  requestTimeout,
  orderRateLimit,
} from "./utils/requestUtils";

// initialize environment variables
dotenv.config();

// initialize express
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// request timeout middleware
app.use(requestTimeout);

// apply the limiter to all requests
app.use(generalRateLimit);

// products routes with user limit rate for requests
app.use("/api/products", productRoutes);

// user routes
app.use("/api/users", userRateLimit, userRoutes);
app.use("/api/users", userRoutes);

// order routes
app.use("/api/orders", orderRateLimit, orderRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/upload/", uploadRoutes);

// get paypal client id from backend
app.get("/api/config/paypal", (req: Request, res: Response) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// serve static files from the "uploads" directory at the "/uploads" URL path

app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads", "images"))
);

app.use("/nodeenv", () => console.log(process.env.NODE_ENV));

//  handling 404 and other errorsth
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
