import { cn } from "@/utils/styleUtils";
import Image from "next/image";

interface EditImageButtonProps {
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
}

export default function EditImageButton({
  className,
  onClick,
  type = "button",
}: EditImageButtonProps) {
  return (
    <button
      className={cn(
        "w-16 h-16 cursor-pointer bg-slate-900/50 border-2 rounded-full flex items-center justify-center",
        className
      )}
      onClick={onClick}
      type={type}
    >
      <Image
        src={"/icons/edit.svg"}
        alt="edit image icon"
        width={24}
        height={24}
      />
    </button>
  );
}
