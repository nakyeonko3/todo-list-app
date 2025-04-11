"use client";
import { toast } from "react-toastify";

export type ToastType = "success" | "failed";

// const CustomIconBlue = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="#4a95f2">
//     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
//   </svg>
// );

// const CustomIconRed = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="#f44336">
//     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
//   </svg>
// );

export function showToast(message: string, toastType: ToastType = "success") {
  if (toastType === "success") {
    toast.success(`${message}`, {
      autoClose: 2000,
      theme: "light",
      draggable: true,
      position: "bottom-right",
    });
  } else {
    toast.error(`${message}`, {
      autoClose: 2000,
      theme: "light",
      draggable: true,
      position: "bottom-right",
    });
  }
}
