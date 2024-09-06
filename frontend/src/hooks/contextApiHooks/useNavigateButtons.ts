import { useContext } from "react";
import { NavigationButtonsContext } from "../../components/NavigationButtons";

const useNavigationButtonsContext = () => {
  const context = useContext(NavigationButtonsContext);
  if (!context)
    throw new Error(
      "NavigationButtonsContext used outside of NavigationButtonsContext provider"
    );

  return context;
};

export default useNavigationButtonsContext;
