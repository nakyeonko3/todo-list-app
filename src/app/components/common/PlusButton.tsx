import { cn } from "@/app/utils/styleUtils";
import Image from "next/image";
export default function PlusButton({ className }: { className?: string }) {
  return (
    <button className={cn(className)}>
      <Image
        src={"/icons/plus_slate.svg"}
        alt="plus icon"
        width={64}
        height={64}
      />
    </button>
  );
}
