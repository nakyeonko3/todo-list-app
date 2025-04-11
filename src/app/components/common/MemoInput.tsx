import { cn } from "@/app/utils/styleUtils";
import Image from "next/image";

interface MemoInputProps {
  defaultValue?: string;
  className?: string;
}

export default function MemoInput({
  defaultValue = "",
  className = "",
}: MemoInputProps) {
  return (
    <div
      className={cn(
        className,
        "relative w-full h-[311px] overflow-hidden py-6 px-4 rounded-3xl"
      )}
    >
      <div className="flex justify-center">
        <label htmlFor="memo" className="font-extrabold text-amber-800">
          Memo
        </label>
      </div>
      <div className="pt-4"></div>
      <div>
        <textarea
          name="memo"
          defaultValue={defaultValue}
          className="bg-transparent z-10 w-full"
          rows={9}
        />
      </div>
      <Image
        src="/images/memo.png"
        alt="memo"
        fill
        className="absolute top-0 left-0 -z-10"
        priority
      />
    </div>
  );
}
