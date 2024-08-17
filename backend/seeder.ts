import Product from "./models/productModel";
import User from "./models/userModel";
import Order from "./models/orderModel";
import { IUserSchema } from "./types/models/userModelTypes";
import users from "./data/usersData";
import { Types } from "mongoose";
import products from "./data/productsData";
import { IProductWithUser } from "./types/data/productDataTypes";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  try {
    await connectDB();

    if (process.argv[2] === "-d") {
      await destroyData();
    } else {
      await importData();
    }
  } catch (error) {
    console.error("An error occurred during execution:", error);
    process.exit(1);
  }
})();

async function importData(): Promise<void> {
  try {
    console.log("Starting data import...");

    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers: IUserSchema[] = await User.insertMany(users);
    console.log(`Users created: ${createdUsers.length}`);

    const adminUser: Types.ObjectId | undefined = createdUsers.find(
      (user) => user.isAdmin === true
    )?._id;

    if (!adminUser) {
      console.error("No admin user found. Cannot import products.");
      process.exit(1);
    }

    const sampleProducts: IProductWithUser[] = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts);
    console.log(
      `Data imported successfully: ${sampleProducts.length} products`
    );
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
}

async function destroyData(): Promise<void> {
  try {
    console.log("Starting data destruction...");

    const orderCount: number = await Order.countDocuments();
    const userCount: number = await User.countDocuments();
    const productCount: number = await Product.countDocuments();

    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log(
      `Data destroyed successfully: ${orderCount} orders, ${userCount} users, and ${productCount} products`
    );
    process.exit();
  } catch (error) {
    console.error("Error destroying data:", error);
    process.exit(1);
  }
}
