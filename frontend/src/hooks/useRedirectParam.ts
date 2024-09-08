import { useLocation } from "react-router-dom";

const useRedirectParam = () => {
  // get 'redirect' query parameter from the URL's search string
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  return {
    redirect,
  };
};

export default useRedirectParam;
