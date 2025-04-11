import { cn } from "@/app/utils/styleUtils";
import Image from "next/image";

export function EmptyState({
  message,
  isVisible,
  emptyImage,
}: {
  message: React.ReactNode;
  isVisible: boolean;
  emptyImage: string;
}) {
  return (
    <div
      className={cn(
        "grid place-items-center text-center font-bold text-slate-400 opacity-0 w-full",
        isVisible && "opacity-100"
      )}
    >
      <div className="relative w-[120px] sm:w-[240px] h-[120px] sm:h-[240px] mr-2">
        <Image src={emptyImage} alt="" fill />
      </div>
      <div className="mt-4"></div>
      <span>{message}</span>
    </div>
  );
}
