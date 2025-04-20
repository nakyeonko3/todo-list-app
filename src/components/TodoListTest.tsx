"use client";

import { useEffect, useState } from "react";
import { fetchTodoById, fetchTodoList } from "../actions/todoActions";
import type { TodoItem, TodoItemSummary } from "../api/api";

export default function TodoListTest() {
  const [todos, setTodos] = useState<TodoItemSummary[] | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState("1");
  const [pageSize, setPageSize] = useState("10");

  // Fetch todos on component mount and when pagination changes
  useEffect(() => {
    async function loadTodos() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchTodoList(page, pageSize);
        setTodos(result);
      } catch (err) {
        setError("Failed to fetch todos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadTodos();
  }, [page, pageSize]);

  // Function to load a single todo
  const loadTodoDetail = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const todo = await fetchTodoById(id);
      setSelectedTodo(todo);
    } catch (err) {
      setError(`Failed to fetch todo #${id}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle pagination
  const handleNextPage = () => {
    setPage((prev) => (parseInt(prev) + 1).toString());
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(1, parseInt(prev) - 1).toString());
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List Test</h1>

      {/* Pagination controls */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handlePrevPage}
          disabled={page === "1" || loading}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={handleNextPage}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
          className="px-2 py-1 border rounded"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="30">30 per page</option>
        </select>
      </div>

      {/* Error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Loading state */}
      {loading && <div className="mb-4">Loading...</div>}

      {/* Todo list */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        {todos && todos.length > 0
          ? todos.map((todo) => (
              <div
                key={todo.id}
                className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => loadTodoDetail(todo.id)}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-medium ${
                      todo.isCompleted ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.name}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      todo.isCompleted
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {todo.isCompleted ? "Completed" : "Pending"}
                  </span>
                </div>
              </div>
            ))
          : !loading && <div>No todos found</div>}
      </div>

      {/* Selected todo details */}
      {selectedTodo && (
        <div className="border p-4 rounded bg-gray-50">
          <h2 className="text-xl font-bold mb-2">Todo Details</h2>
          <div className="mb-2">
            <strong>ID:</strong> {selectedTodo.id}
          </div>
          <div className="mb-2">
            <strong>Name:</strong> {selectedTodo.name}
          </div>
          <div className="mb-2">
            <strong>Memo:</strong> {selectedTodo.memo || "N/A"}
          </div>
          <div className="mb-2">
            <strong>Status:</strong>{" "}
            {selectedTodo.isCompleted ? "Completed" : "Pending"}
          </div>
          {selectedTodo.imageUrl && (
            <div className="mt-2">
              <img
                src={selectedTodo.imageUrl}
                alt={selectedTodo.name}
                className="max-w-xs rounded shadow"
              />
            </div>
          )}
          <button
            onClick={() => setSelectedTodo(null)}
            className="mt-4 px-3 py-1 bg-gray-500 text-white rounded"
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
}
