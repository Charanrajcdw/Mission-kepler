import { toast } from "react-toastify";

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

export const showWarningToast = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};
