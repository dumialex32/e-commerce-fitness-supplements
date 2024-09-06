import { cloneElement, createContext, ReactElement, useState, FC } from "react";
import { createPortal } from "react-dom";
import {
  IModal,
  IModalContext,
  TModalWindowPosition,
} from "../types/components/ModalTypes";
import useModal from "../hooks/contextApiHooks/useModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const modalWindowPosition: Record<TModalWindowPosition, string> = {
  top: "top-1/3",
  center: "top-1/2",
};

export const ModalContext = createContext<IModalContext | null>(null);

const Modal: IModal = ({ children }) => {
  const [openName, setOpenName] = useState<string>("");

  const open = setOpenName;
  const close = () => setOpenName("");

  const contextProvider = { open, close, openName };

  return (
    <ModalContext.Provider value={contextProvider}>
      {children}
    </ModalContext.Provider>
  );
};

const Open: FC<{ children: ReactElement; name: string }> = ({
  children,
  name: openWindowName,
}) => {
  const { open } = useModal();

  return cloneElement(children, { onClick: () => open(openWindowName) });
};

const Window: FC<{
  children: ReactElement;
  name: string;
  positionY?: TModalWindowPosition;
}> = ({ children, name, positionY = "center" }) => {
  console.log(positionY);
  const { close, openName } = useModal();

  if (name !== openName) return;

  return createPortal(
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-red-500">
      <div
        className={`fixed ${modalWindowPosition[positionY]} right-1/2 translate-x-1/2 -translate-y-1/2 border-2 py-2 px-4`}
      >
        <button onClick={close} className="absolute top-1 right-2">
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

// Attach Open and Window components to Modal
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
