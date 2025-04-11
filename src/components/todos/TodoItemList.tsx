"use client";
import TodoSection from "@/components/todos/TodoSection";
import useGetToDos from "@/hooks/useGetToDos";
import { filterTodoItemsByStatus } from "@/utils/todoUtils";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function ToDoItemList() {
  return (
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoItemContent />
      </Suspense>
    </ErrorBoundary>
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
    <div className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-8">
      <TodoSection
        title="TODO"
        items={uncompletedItems}
        emptyMessage={
          <>
            할 일이 없어요
            <br /> TODO를 새롭게 추가해주세요!
          </>
        }
        emptyImage="/images/empty_todo.svg"
      />
      <TodoSection
        title="DONE"
        items={completedItems}
        emptyMessage={
          <>
            아직 다 한 일이 없어요
            <br /> 해야 할 일을 체크해보세요!
          </>
        }
        emptyImage="/images/empty_done.svg"
      />
    </div>
  );
}
