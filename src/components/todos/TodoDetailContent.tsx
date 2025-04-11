"use client";

import ImageUploadeField from "@/components/forms/ImageUploadeField";
import MemoInput from "@/components/forms/MemoInput";
import CheckButton from "@/components/ui/Button/CheckButton";
import DeleteButton from "@/components/ui/Button/DeleteButton";
import UpdateButton from "@/components/ui/Button/UpdateButton";
import Card from "@/components/ui/Card";
import useDeleteTodo from "@/hooks/useDeleteTodo";
import useGetDetailTodo from "@/hooks/useGetToDoDetail";
import useUpdateTodo from "@/hooks/useUpdateTodo";
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

  const handleCheckButton = (event: React.MouseEvent) => {
    event.preventDefault();
    updateTodo({
      itemId: todo.id,
      updateTodoDto: {
        name: todo.name,
        isCompleted: !todo.isCompleted,
      },
    });
  };

  return (
    <div>
      <div className="mb-4">
        <form className="flex flex-col space-y-4" onSubmit={handleUpdateTodo}>
          <Card
            isActive={todo.isCompleted}
            className="flex justify-center rounded-[20px]"
          >
            <CheckButton
              isCompleted={todo.isCompleted}
              onClick={handleCheckButton}
            />
            <label htmlFor="name" className="sr-only">
              TODO 이름
            </label>
            <div className="ml-2" />
            <input
              type="text"
              name="name"
              defaultValue={todo.name || ""}
              className="border-0 underline font-bold text-xl w-1/3"
            />
          </Card>
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <ImageUploadeField
              initialImageUrl={todo.imageUrl}
              label={"이미지 업로드"}
              name={"image"}
            />
            <MemoInput
              defaultValue={todo.memo || ""}
              className="lg:col-span-2"
            />
          </div>
          <div className="w-full flex justify-center lg:justify-end">
            <div className="flex w-[343px] ">
              <UpdateButton />
              <DeleteButton onClick={handleDelete} className="ml-4" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
