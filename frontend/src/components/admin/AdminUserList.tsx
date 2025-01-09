import { useGetUsersQuery } from "../../slices/usersApiSlice";
import { IuseGetUsersQuery } from "../../types/userTypes/usersSliceTypes";
import ScreenTitle from "../ScreenTitle";
import UserTable from "../UserTable";

const AdminUserList: React.FC = () => {
  const { data: users }: IuseGetUsersQuery = useGetUsersQuery();

  return (
    <div>
      <ScreenTitle>User list</ScreenTitle>

      <UserTable data={users} />
    </div>
  );
};

export default AdminUserList;
