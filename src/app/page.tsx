import { AddTodoForm } from "@/components/todos/AddTodoForm";
import ToDoItemList from "@/components/todos/TodoItemList";

export default function Home() {
  return (
    <>
      <AddTodoForm />
      <div className="my-6"></div>
      <ToDoItemList />
    </>
  );
}
