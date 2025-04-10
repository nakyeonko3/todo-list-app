import TodoDetailContent from "@/app/components/TodoDetailContent";
import { Suspense } from "react";

export default async function TodoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  //TODO: todoId가 number가 아닐 때 에 대한 예외처리 필요

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">할 일 상세 보기</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoDetailContent itemId={id} />
      </Suspense>
    </div>
  );
}
