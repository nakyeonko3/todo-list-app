"use client";
import TodoItem from "@/app/components/TodoItem";
import useGetToDos from "@/app/hooks/useGetToDos";
import { filterTodoItemsByStatus } from "@/app/utils/todoUtils";
import { Suspense, useMemo } from "react";

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
    <div>
      <h2 className="text-2xl font-bold">TODO</h2>
      <div className="mb-4">
        {uncompletedItems.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            name={item.name}
            isCompleted={item.isCompleted}
          />
        ))}
      </div>
      <h2 className="text-2xl font-bold">DONE</h2>
      <div className="mb-4">
        {completedItems.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            name={item.name}
            isCompleted={item.isCompleted}
          />
        ))}
      </div>
    </div>
  );
}

export default function ToDoItemList() {
  return (
    <div>
      <h1>Todo List</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoItemContent />
      </Suspense>
    </div>
  );
}
