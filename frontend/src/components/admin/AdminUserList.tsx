import useErrorHandler from "../../hooks/useErrorHandler";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import Loader from "../Loader";
import Message from "../Message";
import ScreenTitle from "../ScreenTitle";
import UserTable from "../UserTable";

const AdminUserList: React.FC = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  const errorMessage = useErrorHandler(error);

  if (isLoading) return <Loader />;
  if (errorMessage) return <Message type="error">{errorMessage}</Message>;
  if (!users || users.length === 0) return;
  return (
    <div>
      <ScreenTitle>User list</ScreenTitle>

      <UserTable data={users} />
    </div>
  );
};

export default AdminUserList;
