"use client";
import TodoItem from "@/app/components/TodoItem";
import useGetToDos from "@/app/hooks/useGetToDos";
import { filterTodoItemsByStatus } from "@/app/utils/todoUtils";
import Image from "next/image";
import { Suspense, useMemo } from "react";

export default function ToDoItemList() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoItemContent />
      </Suspense>
    </div>
  );
}

function TodoItemContent() {
  const { data: todoItems } = useGetToDos();

  const completedItems = useMemo(
    () => filterTodoItemsByStatus(todoItems, true),
    [todoItems]
  );

  const uncompletedItems = useMemo(
    () => filterTodoItemsByStatus(todoItems, false),
    [todoItems]
  );

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <Image src="/images/todo.svg" alt="TODO" width={100} height={100} />
        <ul className="space-y-4">
          {uncompletedItems.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              name={item.name}
              isCompleted={item.isCompleted}
            />
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <Image src="/images/done.svg" alt="" width={100} height={100} />
        <ul className="space-y-4">
          {completedItems.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              name={item.name}
              isCompleted={item.isCompleted}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
