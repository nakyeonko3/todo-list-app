"use client";
/**
 * TodoItemList 컴포넌트
 *
 * 할 일 목록을 표시하는 메인 컴포넌트
 * - 완료된 항목(DONE)과 미완료된 항목(TODO)을 두 섹션으로 나누어 표시
 * - React Query를 사용하여 데이터 fetching 및 상태 관리
 * - Error Boundary와 Suspense를 사용하여 에러 처리 및 로딩 상태 관리
 */
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
