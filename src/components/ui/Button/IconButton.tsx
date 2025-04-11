import { cn } from "@/utils/styleUtils";
import Image from "next/image";

interface IconButtonProps {
  label: string;
  icon: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  iconSize?: number;
  showLabelOnMobile?: boolean;
}

export default function IconButton({
  label,
  icon,
  type = "button",
  onClick,
  className,
  iconSize = 16,
  showLabelOnMobile = false,
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "font-bold gap-2 px-4 py-3 w-full h-[52px] rounded-full bg-slate-100 border-2 border-slate-900 flex items-center justify-center relative cursor-pointer",
        className
      )}
      type={type}
      onClick={onClick}
      aria-label={`버튼: ${label}`}
    >
      <div className="w-full h-[52px] rounded-full absolute left-1 top-0.5 border bg-slate-900 border-slate-900 -z-10"></div>
      <Image
        src={icon}
        alt={`버튼 아이콘: ${label}`}
        width={iconSize}
        height={iconSize}
      />
      <span className={cn(showLabelOnMobile ? "" : "hidden sm:inline")}>
        {label}
      </span>
    </button>
  );
}
