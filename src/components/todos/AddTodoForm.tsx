"use client";
import { InputField } from "@/components/forms/InputField";
import SubmitButton from "@/components/ui/Button/SubmitButton";
import useCreateTodo from "@/hooks/useCreateTodos";
import { showToast } from "@/utils/showToast";
import { FormEvent } from "react";

export function AddTodoForm() {
  const createTodo = useCreateTodo();

  const handleAddTodo = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const todo = formData.get("todo") as string;
    if (!todo || todo.trim() === "") {
      showToast("할 일을 입력해주세요", "failed");
      return;
    }
    createTodo({
      name: todo,
    });
    form.reset();
  };

  return (
    <form className="flex items-center space-x-2" onSubmit={handleAddTodo}>
      <InputField
        label={"할일"}
        name={"todo"}
        placeholder={"할 일을 입력해주세요"}
      />
      <SubmitButton label={"추가하기"} />
    </form>
  );
}
