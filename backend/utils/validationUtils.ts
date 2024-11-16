import { Response } from "express";

const validateName = (name: string) => {
  const regex = /^[a-zA-Z ]+$/;
  if (name.length < 6 || name.length > 24 || !regex.test(name)) {
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
  if (password.length < 6 || password.length > 12 || !regex.test(password))
    return "Invalid password format";

  return undefined;
};

export const validateInputs = (
  res: Response,
  inputs: { name: string; email: string; password: string }
) => {
  const { name, email, password } = inputs;

  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (nameError || emailError || passwordError) {
    res.status(400);
    throw new Error(nameError || emailError || passwordError);
  }
};
