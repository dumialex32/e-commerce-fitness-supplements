import { useLocation } from "react-router-dom";
import useAppNavigate from "./useAppNavigate";

const useRedirectParam = () => {
  const { moveTo } = useAppNavigate();

  const location = useLocation();

  const { search, pathname, hash, state, key } = location;

  // get search value
  const sp = new URLSearchParams(search);
  const redirectPath = sp.get("redirect");

  const redirect = (defaultRedirectPath?: string) =>
    moveTo(redirectPath || defaultRedirectPath || "");

  return {
    redirect,
  };
};

export default useRedirectParam;
