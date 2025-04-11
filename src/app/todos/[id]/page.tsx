import TodoDetailContent from "@/app/components/todos/TodoDetailContent";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

// Next.js의 동적 매개변수 타입 지정

export default async function TodoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoDetailContent itemId={id} />
      </Suspense>
    </ErrorBoundary>
  );
}
