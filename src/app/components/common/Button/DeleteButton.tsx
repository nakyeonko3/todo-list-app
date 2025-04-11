import { cn } from "@/app/utils/styleUtils";
import IconButton from "./IconButton";

interface DeleteButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function DeleteButton({
  onClick,
  className,
}: DeleteButtonProps) {
  return (
    <IconButton
      label="삭제하기"
      icon="/icons/X.svg"
      onClick={onClick}
      type="button"
      showLabelOnMobile={true}
      className={cn("bg-rose-500 text-white", className)}
    />
  );
}
