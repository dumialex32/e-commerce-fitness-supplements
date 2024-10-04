import { Bounce, toast } from "react-toastify";
import { TCreateToast, ToastOptions } from "../types/utils/toastUtilsTypes";

export const createToast: TCreateToast = (
  message: string,
  options?: ToastOptions // handle undefined explicitly
): void => {
  const {
    type = "success",
    orientation = "top-center",
    autoClose = 3000,
    theme = "light",
  } = options || {};

  if (typeof toast[type] === "function") {
    toast[type](message, {
      position: orientation,
      autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme,
      transition: Bounce,
    });
  } else {
    console.error(`Invalid toast type: ${type}`);
  }
};
