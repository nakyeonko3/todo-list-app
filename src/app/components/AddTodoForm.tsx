"use client";
import { createTodo } from "@/app/api/api";
import { InputField } from "@/app/components/common/InputField";
import SubmitButton from "@/app/components/common/SubmitButton";
import { FormEvent } from "react";

export function AddTodoForm() {
  const handleAddTodo = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const todo = formData.get("todo") as string;
    if (!todo) {
      console.error("할 일을 입력하세요.");
      //TODO: 유저에게 TODO 메시지가 없다고 토스트로 알림 주기
      return;
    }
    await createTodo({
      name: todo,
    });
    form.reset();
  };

  return (
    <form className="flex items-center" onSubmit={handleAddTodo}>
      <InputField label={"할일"} name={"todo"} placeholder={"todo를 입력"} />
      <SubmitButton label={"추가"} />
    </form>
  );
}
