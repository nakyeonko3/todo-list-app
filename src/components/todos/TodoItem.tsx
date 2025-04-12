"use client";
import { TodoItemSummary } from "@/api/api";
import CheckButton from "@/components/ui/Button/CheckButton";
import Card from "@/components/ui/Card";
import useToggleTodoCompletion from "@/hooks/useToggleTodoCompletion";
import { cn } from "@/utils/styleUtils";
import Link from "next/link";
import { useState } from "react";

export default function TodoItem({ id, name, isCompleted }: TodoItemSummary) {
  const updateTodo = useToggleTodoCompletion();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleUpdateTodo = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    // 미완료→완료로 변경될 때만 애니메이션 적용
    if (!isCompleted) {
      setIsAnimating(true);

      setTimeout(() => {
        updateTodo(
          {
            itemId: id,
            updateTodoDto: {
              name,
              isCompleted: !isCompleted,
            },
          },
          {
            onSuccess: () => {
              setIsAnimating(false);
            },
          }
        );
      }, 300);
    } else {
      // 완료→미완료로 변경할 때는 즉시 업데이트
      updateTodo({
        itemId: id,
        updateTodoDto: {
          name,
          isCompleted: !isCompleted,
        },
      });
    }
  };

  return (
    <Link href={`/todos/${id}`} className="block">
      <li
        key={id}
        className={cn(
          "transition-all duration-500 ease-in-out transform",
          isAnimating && "opacity-0 scale-95"
        )}
      >
        <Card isActive={isCompleted || isAnimating}>
          <CheckButton
            isCompleted={isCompleted || isAnimating}
            onClick={handleUpdateTodo}
          />
          <span
            className={cn(
              "text-lg font-normal pl-4 text-slate-800 transition-all duration-300",
              isCompleted && "line-through text-slate-500",
              isAnimating && "line-through text-slate-500"
            )}
          >
            {name}
          </span>
        </Card>
      </li>
    </Link>
  );
}
