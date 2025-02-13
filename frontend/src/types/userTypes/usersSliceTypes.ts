// Get all users types
export interface User {
  createdAt: string;
  email: string;
  isAdmin: boolean;
  name: string;
  _id: string;
}

export interface UseGetUsersQuery {
  data: User[];
}

export interface UpdateUserMutationProps {
  userId: string;
  patch: {
    name: string;
    email: string;
    isAdmin: string;
  };
}
