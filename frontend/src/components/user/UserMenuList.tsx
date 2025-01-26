import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ProfileLogout from "./ProfileLogout";
import TreeView from "../Tree view/TreeView";
import { ReactNode } from "react";

export interface ITreeData {
  id: string;
  label: ReactNode | string;
  children?: ITreeData[];
}

const UserMenuList: React.FC<{ isUserLoggedIn: boolean }> = ({
  isUserLoggedIn,
}) => {
  const { userInfo } = useAuth();

  const treeData = isUserLoggedIn
    ? [
        userInfo?.isAdmin && {
          id: "1",
          label: "Admin",
          children: [
            { id: "1.1", label: <Link to="/admin/products">Products</Link> },

            {
              id: "1.2",
              label: <Link to="/admin/orderlist">Order List</Link>,
            },
            {
              id: "1.3",
              label: <Link to="/admin/userlist">User List</Link>,
            },
          ],
        },
        { id: "2", label: <Link to="/profile">Profile</Link> },
        { id: "3", label: <ProfileLogout /> },
      ]
    : [{ id: "1", label: <Link to={"/login"}>Login/Register</Link> }];

  return (
    <div className="absolute border p-2 bg-white transform -translate-x-1/2 left-1/2 rounded-md z-50">
      <TreeView data={treeData} />
    </div>
  );
};

export default UserMenuList;
