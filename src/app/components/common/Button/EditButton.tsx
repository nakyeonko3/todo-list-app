import IconButton from "@/app/components/common/Button/IconButton";
import { cn } from "@/app/utils/styleUtils";

interface EditButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export default function EditButton({
  label = "수정 완료",
  onClick,
  className,
}: EditButtonProps) {
  return (
    <IconButton
      label={label}
      icon="/icons/check_slate.svg"
      onClick={onClick}
      type="submit"
      className={cn("bg-slate-200", className)}
    />
  );
}
