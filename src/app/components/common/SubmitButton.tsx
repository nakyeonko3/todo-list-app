interface SubmitButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export default function SubmitButton({
  label,
  type = "submit",
  onClick,
  disabled,
}: SubmitButtonProps) {
  return (
    <button
      className={`ml-2 p-1 rounded-full ${
        disabled ? "bg-gray-300 cursor-not-allowed" : "hover:bg-gray-200"
      }`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={`버튼: ${label}`}
    >
      {label}
    </button>
  );
}
