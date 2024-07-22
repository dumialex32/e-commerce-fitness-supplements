import { Types } from "mongoose";
import dotenv from "dotenv";

import users from "./data/usersData";
import products from "./data/productsData";
import connectDB from "./config/db";
import User from "./models/userModel";
import Product from "./models/productModel";
import Order from "./models/orderModel";

// Types
import { IUserSchema } from "./types/databaseTypes/userModelTypes";
import { IProductDataTypes } from "./types/dataTypes/productDataTypes";

dotenv.config();

connectDB();

const importData = async (): Promise<void> => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers: IUserSchema[] = await User.insertMany(users);

    const adminUser: Types.ObjectId | undefined = createdUsers.find(
      (user) => user.isAdmin === true
    )?._id;
    console.log(adminUser);

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported");

    process.exit();
  } catch (err) {
    console.error(err);
    console.error(`${err}`);

    process.exit(1);
  }
};

const destroyData = async (): Promise<void> => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log("Data destroyed");

    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
