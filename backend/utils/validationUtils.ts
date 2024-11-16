import { Response } from "express";
import User from "../models/userModel";

const validateName = async (name: string) => {
  const regex = /^[a-zA-Z ]+$/;
  const trimmedName = name.trim();
  const reservedWords = ["admin", "root", "system"];

  const reservedNameMatch = reservedWords.find((n) => n === trimmedName);

  if (reservedNameMatch) {
    const reservedNameExist = await User.findOne({ name: reservedNameMatch });

    if (reservedNameExist) {
      return `Reserved name "${reservedNameMatch}" already exists in the database`;
    }
  }

  if (
    trimmedName.length < 4 ||
    trimmedName.length > 24 ||
    !regex.test(trimmedName)
  ) {
    return "Invalid name format";
  }

  return undefined;
};

const validateEmail = (email: string) => {
  const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return "Invalid email format";
  }

  return undefined;
};

const validatePassword = (password: string) => {
  const regex = /[\d]/;
  if (password.length < 6 || password.length > 12 || !regex.test(password)) {
    return "Invalid password format";
  }

  return undefined;
};

export const validateInputs = async (
  res: Response,
  inputs: { name: string; email: string; password: string }
) => {
  const { name, email, password } = inputs;

  // Make `validateName` asynchronous and wait for its result
  const nameError = await validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (nameError || emailError || passwordError) {
    res.status(400);
    throw new Error(nameError || emailError || passwordError);
  }
};
