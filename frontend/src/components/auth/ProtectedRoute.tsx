import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isUserLoggedIn } = useAuth();

  return isUserLoggedIn ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
