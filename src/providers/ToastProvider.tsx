"use client";
import { cn } from "@/utils/styleUtils";
import { ReactNode } from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

interface ToastProviderProps extends ToastContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ToastProvider({
  children,
  className,
  ...props
}: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        className={cn("toast-container", className)}
        toastClassName="bg-white text-black"
        {...props}
      />
    </>
  );
}
