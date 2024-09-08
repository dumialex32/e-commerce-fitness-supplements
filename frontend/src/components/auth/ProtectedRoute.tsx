import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import useAppNavigate from "../../hooks/useAppNavigate";

const ProtectedRoute = () => {
  const { isUserLoggedIn } = useAuth();
  const { moveTo } = useAppNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      moveTo("/login");
    }
  }, [isUserLoggedIn, moveTo]);

  return isUserLoggedIn ? <Outlet /> : null;
};

export default ProtectedRoute;
2