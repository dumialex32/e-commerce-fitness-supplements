import { Dispatch, FC, ReactElement, ReactNode, SetStateAction } from "react";

export interface IModal extends FC<{ children: ReactNode }> {
  Open: FC<{ children: ReactElement; name: string }>;
  Window: FC<{
    children: ReactElement;
    name: string;
    positionY: TModalWindowYPosition;
  }>;
}

export interface IModalContext {
  open: Dispatch<SetStateAction<string>>;
  close: () => void;
  openName: string;
}

export type TModalWindowYPosition = "top" | "center";
