"use client";

import ImageUploadeField from "@/components/forms/ImageUploadeField";
import MemoInput from "@/components/forms/MemoInput";
import TodoNameHeaderCard from "@/components/todos/TodoNameHeaderCard";
import DeleteButton from "@/components/ui/Button/DeleteButton";
import UpdateButton from "@/components/ui/Button/UpdateButton";
import useDeleteTodo from "@/hooks/useDeleteTodo";
import useGetDetailTodo from "@/hooks/useGetToDoDetail";
import useUpdateTodo from "@/hooks/useUpdateTodo";
import { showToast } from "@/utils/showToast";
import { useRouter } from "next/navigation";

export default function TodoDetailContent({ itemId }: { itemId: string }) {
  const { data: todo } = useGetDetailTodo(Number(itemId));
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();
  const router = useRouter();

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
    const isCompleted = (formData.get("completed") as string) === "true";

    if (!name) {
      showToast("할 일을 입력해주세요", "failed");
      return;
    }
    updateTodo({
      itemId: todo.id,
      updateTodoDto: {
        name,
        memo,
        imageUrl,
        isCompleted,
      },
    });
    router.push("/");
  };

  return (
    <div>
      <div className="mb-4">
        <form className="flex flex-col space-y-4" onSubmit={handleUpdateTodo}>
          <TodoNameHeaderCard
            checkboxName="completed"
            textInputName="name"
            initialCompleted={todo.isCompleted}
            initalText={todo.name}
            className="mb-4"
          />
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <ImageUploadeField
              initialImageUrl={todo.imageUrl}
              label="이미지 업로드"
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
