import {
  cloneElement,
  createContext,
  ReactElement,
  useState,
  FC,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import {
  IModal,
  IModalContext,
  IModalWindowProps,
  TModalWindowYPosition,
} from "../types/componentsTypes/ModalTypes";
import useModal from "../hooks/useModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const modalWindowPosition: Record<TModalWindowYPosition, string> = {
  top: "top-1/3",
  center: "top-1/2",
};

export const ModalContext = createContext<IModalContext | null>(null);

const Modal: IModal = ({ children, name }) => {
  const [openName, setOpenName] = useState<string>("");

  const open = setOpenName;
  const close = () => setOpenName("");

  const contextProvider = { open, close, openName };

  useEffect(() => {
    if (name) {
      setOpenName(name);
    }
  }, []);

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

const Window: FC<IModalWindowProps> = ({
  children,
  name,
  positionY = "center",
}) => {
  const { close, openName } = useModal();
  const modalRef = useRef(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [close]);

  if (name !== openName) return;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-primary/15 backdrop-blur-md transition-all duration-500 z-50">
      <div
        ref={modalRef}
        className={`fixed ${modalWindowPosition[positionY]} right-1/2 translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg transition-all duration-500 p-6`}
      >
        <button onClick={close} className="absolute top-1 right-2">
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
};

// Attach Open and Window components to Modal
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
