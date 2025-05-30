import IconButton from "@/components/ui/Button/IconButton";
import { cn } from "@/utils/styleUtils";

interface UpdateButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export default function UpdateButton({
  label = "수정 완료",
  onClick,
  className,
}: UpdateButtonProps) {
  return (
    <IconButton
      label={label}
      icon="/icons/check_slate.svg"
      onClick={onClick}
      type="submit"
      showLabelOnMobile={true}
      className={cn("bg-slate-200", className)}
    />
  );
}
