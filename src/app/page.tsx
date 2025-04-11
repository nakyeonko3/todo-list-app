import { AddTodoForm } from "@/app/components/todos/AddTodoForm";
import ToDoItemList from "@/app/components/todos/TodoItemList";

export default function Home() {
  return (
    <>
      <AddTodoForm />
      <div className="my-6"></div>
      <ToDoItemList />
    </>
  );
}
