import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword) throw new Error("Hash password failed");

    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
