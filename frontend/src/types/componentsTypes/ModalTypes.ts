import { Dispatch, FC, ReactElement, ReactNode, SetStateAction } from "react";

export interface IModalWindowProps {
  children: ReactElement;
  name: string;
  positionY?: TModalWindowYPosition;
}

export interface IModalOpenProps {
  children: ReactElement;
  name: string;
}

export interface IModalProps {
  children: ReactNode;
  name?: string;
}

export interface IModal extends FC<IModalProps> {
  Open: FC<IModalOpenProps>;
  Window: FC<IModalWindowProps>;
}

export interface IModalContext {
  open: Dispatch<SetStateAction<string>>;
  close: () => void;
  openName: string;
}

export type TModalWindowYPosition = "top" | "center";
