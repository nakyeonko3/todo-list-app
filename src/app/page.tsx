import { AddTodoForm } from "@/app/components/AddTodoForm";
import ToDoItemList from "@/app/components/TodoItemList";

export default function Home() {
  return (
    <>
      <div>
        <AddTodoForm />
        <ToDoItemList />
      </div>
    </>
  );
}
