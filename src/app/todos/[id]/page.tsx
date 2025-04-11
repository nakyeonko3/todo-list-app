import TodoDetailContent from "@/app/components/TodoDetailContent";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function TodoDetailPage({ params }: PageProps) {
  const { id } = params;

  return (
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoDetailContent itemId={id} />
      </Suspense>
    </ErrorBoundary>
  );
}
