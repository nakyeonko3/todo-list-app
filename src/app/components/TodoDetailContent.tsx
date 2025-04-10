"use client";
import ImageUploadeField from "@/app/components/common/ImageUploadeField";
import useDeleteTodo from "@/app/hooks/useDeleteTodo";
import useGetDetailTodo from "@/app/hooks/useGetToDoDetail";
import useUpdateTodo from "@/app/hooks/useUpdateTodo";
import { useRouter } from "next/navigation";

export default function TodoDetailContent({ itemId }: { itemId: string }) {
  const { data: todo } = useGetDetailTodo(Number(itemId));
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();
  const router = useRouter();
  // TODO: TodoDetailConent 로딩 및 에러 상태 처리 필요
  const handleDelete = () => {
    deleteTodo(todo.id);
    router.push("/");
  };

  const handleBackButton = () => {
    router.back();
  };

  const handleUpdateTodo = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const memo = formData.get("memo") as string;
    const imageUrl = formData.get("image") as string;
    // TODO: 수정 실패시, 에러 처리 로직 필요, 사용자에게 피드백 제공 (예: 알림창, 토스트 메시지 등)
    if (!name) {
      console.error("수정 실패");
      return;
    }
    updateTodo({
      itemId: todo.id,
      updateTodoDto: {
        name,
        memo,
        imageUrl,
      },
    });
    router.push("/");
  };

  return (
    <div>
      <div className="mb-4">
        <form className="flex items-center" onSubmit={handleUpdateTodo}>
          <span className="font-semibold">할 일: </span>
          <label htmlFor="todo" className="sr-only">
            할 일
          </label>
          <input
            type="text"
            name="name"
            defaultValue={todo.name}
            className="border border-gray-300 rounded-md px-4 py-2 ml-2 flex-grow"
          />
          <span className="font-semibold ml-4">메모: </span>
          <label htmlFor="memo" className="sr-only">
            메모
          </label>
          <input
            type="text"
            name="memo"
            defaultValue={todo.memo || ""}
            className="border border-gray-300 rounded-md px-4 py-2 ml-2 flex-grow"
          />
          <ImageUploadeField
            initialImageUrl={todo.imageUrl}
            label={"이미지 업로드"}
            name={"image"}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
          >
            수정 하기
          </button>
        </form>
        <span className="font-semibold">상태: </span>
        <span
          className={`${todo.isCompleted ? "text-green-500" : "text-red-500"}`}
        >
          {todo.isCompleted ? "완료" : "미완료"}
        </span>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md ml-4"
          onClick={handleDelete}
        >
          삭제 하기
        </button>
        <button
          onClick={handleBackButton}
          className="bg-gray-200 px-4 py-2 rounded-md"
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}
