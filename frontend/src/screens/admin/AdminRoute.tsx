import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = () => {
  const { isUserLoggedIn, userInfo } = useAuth();

  return isUserLoggedIn && userInfo?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace />
  );
};
export default AdminRoute;
