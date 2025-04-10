"use client";
import ImageUploadField from "@/app/components/common/ImageUploadeField";
import useDeleteTodo from "@/app/hooks/useDeleteTodo";
import useGetDetailTodo from "@/app/hooks/useGetToDoDetail";
import useUpdateTodo from "@/app/hooks/useUpdateTodo";

export default function TodoDetailContent({ itemId }: { itemId: string }) {
  const { data: todo } = useGetDetailTodo(Number(itemId));
  const deleteTodo = useDeleteTodo();
  const handleDelete = () => {
    deleteTodo(todo.id);
    history.back();
  };

  const updateTodo = useUpdateTodo();

  const handleUpdateTodo = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const memo = formData.get("memo") as string;
    const imageUrl = formData.get("image") as string;
    // TODO: 수정 실패시, 에러 처리 로직 필요
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
    history.back();
  };

  return (
    <div>
      <div className="mb-4">
        <form className="flex items-center" onSubmit={handleUpdateTodo}>
          <span className="font-semibold">할 일: </span>
          <label htmlFor="todo" className="sr-only hidden">
            할 일
          </label>
          <input
            type="text"
            name="name"
            defaultValue={todo.name}
            className="border border-gray-300 rounded-md px-4 py-2 ml-2 flex-grow"
          />
          <span className="font-semibold ml-4">메모: </span>
          <label htmlFor="memo" className="sr-only hidden">
            메모
          </label>
          <input
            type="text"
            name="memo"
            defaultValue={todo.memo || ""}
            className="border border-gray-300 rounded-md px-4 py-2 ml-2 flex-grow"
          />
          <ImageUploadField
            initialImageUrl={todo.imageUrl}
            onImageUpload={(imageUrl) => {
              console.log("업로드된 이미지 URL:", imageUrl);
            }}
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
          onClick={() => history.back()}
          className="bg-gray-200 px-4 py-2 rounded-md"
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}
