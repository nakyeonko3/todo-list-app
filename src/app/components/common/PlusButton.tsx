import { cn } from "@/app/utils/styleUtils";
import Image from "next/image";

interface PlusButtonProps {
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
}

export default function PlusButton({
  className,
  onClick,
  type = "button",
}: PlusButtonProps) {
  return (
    <button
      className={cn("cursor-pointer", className)}
      onClick={onClick}
      type={type}
    >
      <Image
        src={"/icons/plus_slate.svg"}
        alt="plus icon"
        width={64}
        height={64}
      />
    </button>
  );
}
