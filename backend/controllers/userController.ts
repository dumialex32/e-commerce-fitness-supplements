import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import { IUserSchema } from "../types/models/userModelTypes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @desc: Auth user and get token
 * @route: POST /api/users/login
 * @access: Public
 */

const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: IUserSchema | null = await User.findOne({ email });

  if (user && password) {
    const matchPass: boolean = await bcrypt.compare(password, user.password);

    if (matchPass) {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable not set");
      }

      // create token
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      // set jwt as http-only
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // (30 days)
      });

      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401); // unauthorized code
      throw new Error("Wrong username or password");
    }
  }
});

/**
 * @desc: Register user
 * @route: POST /api/users
 * @access: Public
 */

const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.send("register user");
  }
);

/**
 * @deesc: Logout user / clear cookie
 * @route: POST /api/users/logout
 * @access: Private
 */

const logoutUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.send("logout user");
  }
);

/**
 * @desc: Get user profile
 * @route: GET /api/users/profile
 * @access: Private
 */

const getUserProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.send("get user profile");
  }
);

/**
 * @desc: Update user profile
 * @route: PUT /api/users/profile
 * @access: Private
 */

const updateUserProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.send("update user profile");
  }
);

/**
 * @desc: Get users
 * @routeL: GET /api/users
 * @access: Private/Admin
 */

const getUsers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.send("Get all users");
  }
);

/**
 * @desc: Get user by id
 * @route: GET /api/users/:id
 * @access: Private/Admin
 */

const getUserById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.send("get user by id");
  }
);

/**
 * @desc: Delete user
 * @route: POST /api/users/:id
 * @access: Private/Admin
 */

const deleteUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.send("delete user");
  }
);

/**
 * @desc: Update user
 * @route PUT /api/users/:id
 * @access: Private/Admin
 */

const updateUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.send("update user ");
  }
);

export {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  getUserById,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  updateUser,
};
