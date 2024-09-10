export type Orientation =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

type ToastType = "success" | "error";

export interface ToastOptions {
  type?: ToastType;
  orientation?: Orientation;
  autoClose?: number;
  theme?: "light" | "dark";
}

export type TCreateToast = (message: string, options: ToastOptions) => void;
