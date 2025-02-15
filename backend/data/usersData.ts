import bcryptjs from "bcryptjs";
import { UserSeedData } from "../types/data/userDataTypes";

// const users: IUser[] = [
//   {
//     name: "admin",
//     email: "admin@email.com",
//     password: bcryptjs.hashSync("123456", 10),
//     isAdmin: true,
//   },
//   {
//     name: "Dana White",
//     email: "dana99@email.com",
//     password: bcryptjs.hashSync("123456789", 10),
//     isAdmin: false,
//   },
//   {
//     name: "Lara Craft",
//     email: "laracraft2019@email.com",
//     password: bcryptjs.hashSync("1234567891011", 10),
//     isAdmin: false,
//   },
// ];

const users: UserSeedData[] = Array.from({ length: 30 }, (_, i) => {
  return {
    name: `User${i + 1}`,
    email: `user${i + 1}@email.com`,
    password: bcryptjs.hashSync("password123", 10),
    isAdmin: i === 0,
  };
});

export default users;
