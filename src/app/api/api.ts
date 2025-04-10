import { fetchClient } from "./fetchClient";

export interface TodoItem {
  id: number;
  tenantId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}

export type TodoItemSummary = Pick<TodoItem, "id" | "name" | "isCompleted">;

export interface CreateTodoDto {
  name: string;
}

export interface CreateTodoResponse {
  id: number;
  tenantId: string;
  name: string | null;
  memo?: string | null;
  imageUrl?: string | null;
  isCompleted?: boolean;
}

export interface UpdateTodoDto {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

export interface UploadImageDto {
  image?: Blob;
}

export interface UploadImageSuccessResponse {
  url: string;
}

export type UploadImageGenericResponse = { [key: string]: unknown };

export const createTodo = (createTodoDto: CreateTodoDto) => {
  return fetchClient<CreateTodoResponse>(`items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(createTodoDto),
  });
};

export const getTodos = ({
  page = "1",
  pageSize = "10",
}: {
  page?: string;
  pageSize?: string;
} = {}) => {
  return fetchClient<TodoItemSummary[]>(
    `items?page=${page}&pageSize=${pageSize}`
  );
};

export const getTodoById = (itemId: number) => {
  return fetchClient<TodoItem>(`items/${itemId}`);
};

export const updateTodo = ({
  itemId,
  updateTodoDto,
}: {
  itemId: number;
  updateTodoDto: UpdateTodoDto;
}) => {
  return fetchClient<TodoItem>(`items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateTodoDto),
  });
};

export const deleteTodo = (itemId: number) => {
  return fetchClient<{ [key: string]: unknown }>(`items/${itemId}`, {
    method: "DELETE",
  });
};

export const uploadImage = (uploadImageDto: UploadImageDto) => {
  const formData = new FormData();
  if (uploadImageDto.image !== undefined) {
    formData.append("image", uploadImageDto.image);
  }

  return fetchClient<UploadImageGenericResponse | UploadImageSuccessResponse>(
    `images/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
};

export type CreateTodoResult = NonNullable<
  Awaited<ReturnType<typeof createTodo>>
>;
export type GetTodosResult = NonNullable<Awaited<ReturnType<typeof getTodos>>>;
export type GetTodoByIdResult = NonNullable<
  Awaited<ReturnType<typeof getTodoById>>
>;
export type UpdateTodoResult = NonNullable<
  Awaited<ReturnType<typeof updateTodo>>
>;
export type DeleteTodoResult = NonNullable<
  Awaited<ReturnType<typeof deleteTodo>>
>;
export type UploadImageResult = NonNullable<
  Awaited<ReturnType<typeof uploadImage>>
>;
