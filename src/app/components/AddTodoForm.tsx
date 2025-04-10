"use client";
// import { createTodo } from "@/app/api/api";
import { InputField } from "@/app/components/common/InputField";
import SubmitButton from "@/app/components/common/SubmitButton";
import useCreateTodo from "@/app/hooks/useCreateTodos";
import { FormEvent } from "react";

export function AddTodoForm() {
  const createTodo = useCreateTodo();

  const handleAddTodo = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const todo = formData.get("todo") as string;
    if (!todo) {
      console.error("할 일을 입력하세요.");
      //TODO: Todo 입력 검증 및 사용자 피드백 개선 필요, 유저에게 TODO 메시지가 없다고 토스트로 알림 주기,
      return;
    }
    createTodo({
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
