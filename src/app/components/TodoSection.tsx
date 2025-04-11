import { TodoItemSummary } from "@/app/api/api";
import TodoItem from "@/app/components/TodoItem";
import { EmptyState } from "@/app/components/EmptyState";
import Image from "next/image";

interface TodoSectionProps {
  title: string;
  items: TodoItemSummary[];
  emptyMessage: React.ReactNode;
  emptyImage: string;
}

export default function TodoSection({
  title,
  items,
  emptyMessage,
  emptyImage,
}: TodoSectionProps) {
  const isEmpty = items.length === 0;
  return (
    <div className="space-y-4">
      <Image
        src={title === "TODO" ? "/images/todo.svg" : "/images/done.svg"}
        alt={title}
        width={100}
        height={100}
      />
      <ul className="space-y-4">
        {items.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            name={item.name}
            isCompleted={item.isCompleted}
          />
        ))}
      </ul>
      <EmptyState
        message={emptyMessage}
        isVisible={isEmpty}
        emptyImage={emptyImage}
      />
    </div>
  );
}
