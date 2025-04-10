import Image from "next/image";
interface SubmitButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function SubmitButton({
  label,
  type = "submit",
  onClick,
}: SubmitButtonProps) {
  return (
    <button
      className={`font-bold sm:w-[158px] w-[56px] h-[52px] px-3 py-3 rounded-full bg-slate-100 border-2 border-slate-900 flex items-center justify-center relative gap-1`}
      type={type}
      onClick={onClick}
      aria-label={`버튼: ${label}`}
    >
      <Image
        src="/icons/plus_black.svg"
        alt={`버튼 아이콘: ${label}`}
        width={16}
        height={16}
      />
      <div className="w-full h-[52px] rounded-full absolute left-1 top-0.5 border bg-slate-900 border-slate-900 -z-10"></div>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
