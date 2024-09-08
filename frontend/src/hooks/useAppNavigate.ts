import { To, useNavigate } from "react-router-dom";

export interface NavigateState {
  [key: string]: any;
}

const useAppNavigate = () => {
  const navigate = useNavigate();

  const moveTo = (to: To, state?: NavigateState): void =>
    navigate(to, { state });

  const moveBack = (): void => {
    navigate(-1);
  };

  return { moveTo, moveBack };
};

export default useAppNavigate;
