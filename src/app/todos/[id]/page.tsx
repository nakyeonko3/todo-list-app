import TodoDetailContent from "@/app/components/TodoDetailContent";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function TodoDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoDetailContent itemId={id} />
      </Suspense>
    </ErrorBoundary>
  );
}
