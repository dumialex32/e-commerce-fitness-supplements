import { useGetUsersQuery } from "../../slices/usersApiSlice";
import { UseGetUsersQuery } from "../../types/userTypes/usersSliceTypes";
import ScreenTitle from "../ScreenTitle";
import UserTable from "../UserTable";

const AdminUserList: React.FC = () => {
  const { data: users }: UseGetUsersQuery = useGetUsersQuery();

  return (
    <div>
      <ScreenTitle>User list</ScreenTitle>

      <UserTable data={users} />
    </div>
  );
};

export default AdminUserList;
