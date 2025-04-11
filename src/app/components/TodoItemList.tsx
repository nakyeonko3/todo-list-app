"use client";
import TodoSection from "@/app/components/TodoSection";
import useGetToDos from "@/app/hooks/useGetToDos";
import { filterTodoItemsByStatus } from "@/app/utils/todoUtils";
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

// <div className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-8">
//     <div className="space-y-4">
//       <Image src="/images/todo.svg" alt="TODO" width={100} height={100} />
//       <ul className="space-y-4">
//         {uncompletedItems.map((item) => (
//           <TodoItem
//             key={item.id}
//             id={item.id}
//             name={item.name}
//             isCompleted={item.isCompleted}
//           />
//         ))}
//       </ul>
//       <div
//         className={cn(
//           "grid place-items-center text-center font-bold text-slate-400 opacity-0 w-full",
//           noUncompletedItems && "opacity-100"
//         )}
//       >
//         <div className="relative w-[120px] sm:w-[240px] h-[120px] sm:h-[240px]  mr-2">
//           <Image src="/images/empty_todo.png" alt="empty todo" fill />
//         </div>
//         <div className="mt-4"></div>
//         <span>
//           할 일이 없어요
//           <br /> TODO를 새롭게 추가해주세요!
//         </span>
//       </div>
//     </div>
//     <div className="space-y-4">
//       <Image src="/images/done.svg" alt="" width={100} height={100} />
//       <ul className="space-y-4">
//         {completedItems.map((item) => (
//           <TodoItem
//             key={item.id}
//             id={item.id}
//             name={item.name}
//             isCompleted={item.isCompleted}
//           />
//         ))}
//       </ul>
//       <div
//         className={cn(
//           "grid place-items-center text-center font-bold text-slate-400 opacity-0",
//           noCompletedItems && "opacity-100"
//         )}
//       >
//         <div className="relative w-[120px] sm:w-[240px] h-[120px] sm:h-[240px] mr-2">
//           <Image src="/images/empty_done.png" alt="empty done" fill />
//         </div>
//         <div className="mt-4"></div>
//         <span>
//           아직 다 한 일이 없어요
//           <br /> 해야 할 일을 체크해보세요!
//         </span>
//       </div>
//     </div>
//   </div>
