import { cn } from "@/app/utils/styleUtils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  children: React.ReactNode;
}

const Card = ({
  isActive = false,
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        "flex w-full h-[50px] p-2 items-center border-2 rounded-full border-slate-900",
        isActive && "bg-violet-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
