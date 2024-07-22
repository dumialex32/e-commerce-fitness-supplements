import express from "express";
import products from "./data/productsData";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();
const port: number = Number(process.env.PORT) || 8000;

connectDB();

const app = express();

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  res.json(product);
});

app.listen(port);
