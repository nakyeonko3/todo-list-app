"use client";
import { toast } from "react-toastify";

export type ToastType = "success" | "failed";

export function showToast(message: string, toastType: ToastType = "success") {
  if (toastType === "success") {
    toast.success(`${message}`, {
      autoClose: 3000,
      theme: "light",
      draggable: true,
      position: "bottom-right",
    });
  } else {
    toast.error(`${message}`, {
      autoClose: 3000,
      theme: "light",
      draggable: true,
      position: "bottom-right",
    });
  }
}
