import { useContext } from "react";
import { ModalContext } from "../components/Modal";

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("ModalContext used outside of ModalContext provider ");

  return context;
};

export default useModal;
