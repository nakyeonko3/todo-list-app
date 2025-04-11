import { AddTodoForm } from "@/app/components/AddTodoForm";
import ToDoItemList from "@/app/components/TodoItemList";

export default function Home() {
  return (
    <>
      <AddTodoForm />
      <div className="my-6"></div>
      <ToDoItemList />
    </>
  );
}
