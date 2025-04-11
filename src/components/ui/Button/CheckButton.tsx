import { cn } from "@/utils/styleUtils";
import Image from "next/image";
interface CheckButtonProps {
  isCompleted: boolean;
  onClick: (event: React.MouseEvent) => void;
}
export default function CheckButton({
  isCompleted,
  onClick,
}: CheckButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer",
        isCompleted ? "bg-violet-600" : "bg-yellow-50 border-2 border-slate-900"
      )}
    >
      <Image
        src="/icons/check_white.svg"
        alt="Incomplete Task"
        width={24}
        height={24}
        className={cn(
          "absolute transition-all duration-300",
          isCompleted ? "opacity-100" : "opacity-0"
        )}
      />
    </button>
  );
}
