import { Dispatch, FC, ReactElement, ReactNode, SetStateAction } from "react";

export interface ModalWindowProps {
  children: ReactElement;
  name: string;
  positionY?: ModalWindowYPosition;
}

export interface ModalOpenProps {
  children: ReactElement;
  name: string;
}

export interface ModalProps {
  children: ReactNode;
  name?: string;
}

export interface IModal extends FC<ModalProps> {
  Open: FC<ModalOpenProps>;
  Window: FC<ModalWindowProps>;
}

export interface IModalContext {
  open: Dispatch<SetStateAction<string>>;
  close: () => void;
  openName: string;
}

export type ModalWindowYPosition = "top" | "center";
