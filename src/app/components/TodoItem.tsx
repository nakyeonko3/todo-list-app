import { TodoItemSummary } from "@/app/api/api";
import useUpdateTodo from "@/app/hooks/useUpdateTodo";
import { cn } from "@/app/utils/styleUtils";
import Image from "next/image";
import Link from "next/link";

interface CheckButtonProps {
  isCompleted: boolean;
  onClick: (event: React.MouseEvent) => void;
}
function CheckButton({ isCompleted, onClick }: CheckButtonProps) {
  return (
    <button onClick={onClick} className="relative w-8 h-8">
      {isCompleted ? (
        <Image
          src="/icons/check_in_circle.svg"
          alt="Completed Task"
          width={32}
          height={32}
        />
      ) : (
        <Image
          src="/icons/circle.svg"
          alt="Incomplete Task"
          width={32}
          height={32}
        />
      )}
    </button>
  );
}

export default function TodoItem({ id, name, isCompleted }: TodoItemSummary) {
  const updateTodo = useUpdateTodo();

  const handleUpdateTodo = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    updateTodo({
      itemId: id,
      updateTodoDto: {
        name,
        isCompleted: !isCompleted,
      },
    });
  };

  return (
    <Link href={`/todos/${id}`} className="block">
      <li key={id}>
        <div
          className={cn(
            "flex w-full   h-[50px] p-2 items-center border-2 rounded-full border-slate-900",
            isCompleted && "bg-violet-100"
          )}
        >
          <CheckButton isCompleted={isCompleted} onClick={handleUpdateTodo} />
          <span
            className={cn(
              "text-lg font-normal pl-4 text-slate-800",
              isCompleted && "line-through "
            )}
          >
            {name}
          </span>
        </div>
      </li>
    </Link>
  );
}
