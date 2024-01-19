import { toast } from "react-toastify";

export const showSuccessToast = (message, currentTheme) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: currentTheme,
  });
};

export const showWarningToast = (message, currentTheme) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: currentTheme,
  });
};
