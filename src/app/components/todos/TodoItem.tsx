import { TodoItemSummary } from "@/app/api/api";
import CheckButton from "@/app/components/ui/Button/CheckButton";
import Card from "@/app/components/ui/Card";
import useUpdateTodo from "@/app/hooks/useUpdateTodo";
import { cn } from "@/app/utils/styleUtils";
import Link from "next/link";

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
        <Card isActive={isCompleted}>
          <CheckButton isCompleted={isCompleted} onClick={handleUpdateTodo} />
          <span
            className={cn(
              "text-lg font-normal pl-4 text-slate-800",
              isCompleted && "line-through "
            )}
          >
            {name}
          </span>
        </Card>
      </li>
    </Link>
  );
}
