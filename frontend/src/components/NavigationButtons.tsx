import { createContext, FC, ReactNode } from "react";
import useAppNavigate from "../hooks/useNavigate";

import useNavigationButtonsContext from "../hooks/contextApiHooks/useNavigateButtons";
import {
  INavigationButtons,
  INavigationButtonsContext,
} from "../types/components/NavigationButtonsTypes";

export const NavigationButtonsContext =
  createContext<INavigationButtonsContext | null>(null);

const NavigationButtons: INavigationButtons = ({ children }) => {
  const { moveBack, moveTo } = useAppNavigate();

  return (
    <NavigationButtonsContext.Provider value={{ moveBack, moveTo }}>
      <div className="mb-6 flex items-center justify-between">{children}</div>
    </NavigationButtonsContext.Provider>
  );
};

const NavigateBack: FC<{ name?: string }> = ({ name = "Go back" }) => {
  const { moveBack } = useNavigationButtonsContext();
  return (
    <button className="btn" onClick={moveBack}>
      {name}
    </button>
  );
};

const NavigateTo: FC<{ to: string; children: ReactNode }> = ({
  to,
  children,
}) => {
  const { moveTo } = useNavigationButtonsContext();
  return (
    <button
      className="btn btn-primary"
      onClick={() => moveTo(to === "/" ? "/" : `/${to}`)}
    >
      {children}
    </button>
  );
};

// Assign the static property
NavigationButtons.NavigateBack = NavigateBack;
NavigationButtons.NavigateTo = NavigateTo;

export default NavigationButtons;
