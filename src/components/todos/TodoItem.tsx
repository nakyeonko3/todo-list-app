"use client";
import { TodoItemSummary } from "@/api/api";
import CheckButton from "@/components/ui/Button/CheckButton";
import Card from "@/components/ui/Card";
import useToggleTodoCompletion from "@/hooks/useToggleTodoCompletion";
import { cn } from "@/utils/styleUtils";
import Link from "next/link";

export default function TodoItem({ id, name, isCompleted }: TodoItemSummary) {
  const updateTodo = useToggleTodoCompletion();

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
