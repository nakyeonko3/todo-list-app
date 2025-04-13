"use server";

import {
  getTodoById,
  getTodos,
  type TodoItem,
  type TodoItemSummary,
} from "../api/api";

/**
 * Server Action to fetch all todos with pagination
 */
export async function fetchTodoList(
  page?: string,
  pageSize?: string
): Promise<TodoItemSummary[] | null> {
  try {
    const todos = await getTodos({ page, pageSize });
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return null;
  }
}

/**
 * Server Action to fetch a single todo by id
 */
export async function fetchTodoById(id: number): Promise<TodoItem | null> {
  try {
    const todo = await getTodoById(id);
    return todo;
  } catch (error) {
    console.error(`Error fetching todo with id ${id}:`, error);
    return null;
  }
}
