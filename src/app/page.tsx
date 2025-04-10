import { AddTodoForm } from "@/app/components/AddTodoForm";
import ToDoItemList from "@/app/components/TodoItemList";

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Todo List</h1>
        <AddTodoForm />
        <ToDoItemList />
      </div>
    </>
  );
}
