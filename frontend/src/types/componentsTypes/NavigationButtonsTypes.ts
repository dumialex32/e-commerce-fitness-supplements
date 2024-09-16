import { FC, ReactNode } from "react";
import { To } from "react-router-dom";

export interface INavigationButtons extends FC<{ children: ReactNode }> {
  NavigateBack: FC<{ name?: string }>;
  NavigateTo: FC<{ to: string; children: ReactNode }>;
}

export interface INavigationButtonsContext {
  moveBack: () => void;
  moveTo: (to: To, state?: [key: string]) => void;
}
