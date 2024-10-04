import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import { IUserSchema } from "../types/models/userModelTypes";
import bcrypt from "bcryptjs";

import { createToken } from "../utils/tokenUtils";
import { hashPassword } from "../utils/hashUtils";
import { IAuthResponse } from "../types/users/authTypes";
import { validateInputs } from "../utils/validationUtils";

/**
 * @desc: Auth user and get token
 * @route: POST /api/users/login
 * @access: Public
 */

const authUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const email: string = req.body.email;
    const enteredPassword: string = req.body.password;
    const user: IUserSchema | null = await User.findOne({ email });

    if (user && enteredPassword) {
      const matchPassword: boolean = await bcrypt.compare(
        enteredPassword,
        user.password
      );

      if (matchPassword) {
        //generate a JWT token for the user and set it as an HTTP-only cookie
        createToken(res, user._id);

        res.status(200).json({
          userId: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        } as IAuthResponse);
      } else {
        res.status(401);
        throw new Error("Wrong password");
      }
    } else {
      res.status(401);
      throw new Error("Wrong email or password");
    }
  }
);

/**
 * @desc: Register user
 * @route: POST /api/users
 * @access: Public
 */

const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = req.body;

    validateInputs(res, { ...req.body });

    const userExist: IUserSchema | null = await User.findOne({ email });

    if (userExist) {
      res.status(400);
      throw new Error("This email is already registered.");
    }
    // hash the input password
    const hashedPassword: string = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    createToken(res, newUser._id);

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });
    }
  }
);

/**
 * @deesc: Logout user / clear cookie
 * @route: POST /api/users/logout
 * @access: Private
 */

const logoutUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
  }
);

/**
 * @desc: Get user profile
 * @route: GET /api/users/profile
 * @access: Private
 */

const getUserProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Not authorized");
    }
  }
);

/**
 * @desc: Update user profile
 * @route: PUT /api/users/profile
 * @access: Private
 */

const updateUserProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        const hashedPassword = await hashPassword(req.body.password);
        user.password = hashedPassword;
      }
      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(400).json({ message: "User not found" });
    }
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
