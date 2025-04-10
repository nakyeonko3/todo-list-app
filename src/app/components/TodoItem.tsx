import { TodoItemSummary } from "@/app/api/api";
import useUpdateTodo from "@/app/hooks/useUpdateTodo";
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
      <div className="flex items-center justify-between p-4 border-b">
        <h2>{name}</h2>
        <button
          className="ml-4 p-2 bg-blue-500 text-white rounded"
          onClick={handleUpdateTodo}
        >
          {isCompleted ? "완료 취소" : "완료"}
        </button>
      </div>
    </Link>
  );
}
