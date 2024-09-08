// form validators
export const validateName = (name: string) => {
  const trimmedName = name.trim();
  const validNameRegex = /^[a-zA-Z0-9_]+$/;
  const sequentialOrRepeatedRegex = /(.)\1{2,}/;
  const reserverdWords = ["admin", "root", "system"];
  if (trimmedName.length < 3) return "Name must contain at least 3 characters";

  if (trimmedName.length > 30) return "Name must not exceed 30 characters";

  if (!validNameRegex.test(trimmedName))
    return "Name must contain only letters, numbers and underscores";

  if (reserverdWords.includes(trimmedName))
    return "Reserved name, please choose another one";

  if (sequentialOrRepeatedRegex.test(trimmedName))
    return "Name must not contain three or more repeated characters in a row";

  return "";
};

export const validateEmail = (email: string) => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  return "";
};

export const validatePassword = (
  password: string,
  confirmPassword?: string
) => {
  const minLenght: number = 6;
  const maxLenght: number = 18;
  const passwordRegex: RegExp = /\d/;

  if (password && !confirmPassword) {
    if (password.length < minLenght || password.length > maxLenght) {
      return "Password length must be between six and 18 characters long";
    }
    if (!passwordRegex.test(password)) {
      return "Password must contain at least one number";
    }
  }

  if (password && confirmPassword) {
    if (password !== confirmPassword) return "Password does not match";
  }

  return "";
};
