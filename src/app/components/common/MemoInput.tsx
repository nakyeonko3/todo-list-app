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
    <div className="relative w-[696px] h-[311px] overflow-hidden py-6 px-4">
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
          className={`${className} bg-transparent z-10 w-full`}
          rows={9}
        />
      </div>
      <Image
        src="/images/memo.png"
        alt="memo"
        width={696}
        height={311}
        className="absolute top-0 left-0 -z-10"
        priority
      />
    </div>
  );
}
