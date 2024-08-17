import bcryptjs from "bcryptjs";
import { IUser } from "../types/data/userDataTypes";

const users: IUser[] = [
  {
    name: "admin",
    email: "admin@email.com",
    password: bcryptjs.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Dana White",
    email: "dana99@email.com",
    password: bcryptjs.hashSync("123456789", 10),
    isAdmin: false,
  },
  {
    name: "Lara Craft",
    email: "laracraft2019@email.com",
    password: bcryptjs.hashSync("1234567891011", 10),
    isAdmin: false,
  },
];

export default users;

// interface IUserCreationParams {
//   name: string;
//   email: string;
//   password: string;
//   isAdmin?: boolean;
// }

// const userCreationParams: IUserCreationParams[] = [
//   {
//     name: "Admin User",
//     email: "admin@gmail.com",
//     password: "123456",
//     isAdmin: true,
//   },
//   {
//     name: "Dana White",
//     email: "danawhite@gmail.com",
//     password: "123456",
//     isAdmin: false,
//   },
// ];

// const initializeUsers = async (): Promise<User[]> => {
//   try {
//     return await Promise.all(
//       userCreationParams.map(async (user) => {
//         const hashedPassword = await bcryptjs.hash(user.password, 10);
//         return {
//           ...user,
//           password: hashedPassword,
//           isAdmin: user.isAdmin || false,
//         } as User;
//       })
//     );
//   } catch (err) {
//     console.error(`Error creating users: ${err}`);
//     throw err;
//   }
// };

// const users = (async () => await initializeUsers())();
// console.log(users);

// export default users;
