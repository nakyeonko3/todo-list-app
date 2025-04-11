import { cn } from "@/app/utils/styleUtils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button className="relative" {...props}>
      <div
        className={cn(
          "px-4 py-3 h-[52px] rounded-full bg-slate-100 border-2 border-slate-900 shadow-right-bottom flex items-center justify-center relative",
          className
        )}
      >
        {children}
      </div>
    </button>
  );
}
