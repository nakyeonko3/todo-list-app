import { getTodos, TodoItemSummary } from "@/app/api/api";

function TodoItem({ name, isCompleted }: TodoItemSummary) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h2>{name}</h2>
      <p>{isCompleted ? "완료" : "미완료"}</p>
    </div>
  );
}

export default async function ToDoItemList() {
  const todoItems = await getTodos();

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        {todoItems.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            name={item.name}
            isCompleted={item.isCompleted}
          />
        ))}
      </div>
    </div>
  );
}
