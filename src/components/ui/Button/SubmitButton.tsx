import { cn } from "@/utils/styleUtils";
import IconButton from "./IconButton";

interface SubmitButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export default function SubmitButton({
  label = "추가",
  onClick,
  className,
}: SubmitButtonProps) {
  return (
    <IconButton
      label={label}
      icon="/icons/plus_black.svg"
      type="submit"
      onClick={onClick}
      className={cn(className, "w-[56px] sm:min-w-[164px]")}
      showLabelOnMobile={false}
    />
  );
}
