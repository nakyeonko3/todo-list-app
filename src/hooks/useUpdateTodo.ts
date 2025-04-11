import { TodoItem, TodoItemSummary, updateTodo } from "@/api/api";
import { TODO_DETAIL_QUERY_KEY, TODOS_QUERY_KEY } from "@/constants/queries";
import { showToast } from "@/utils/showToast";
import { textShortener } from "@/utils/textShorten";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateTodo() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodoItem) => {
      await queryClient.cancelQueries({ queryKey: [TODO_DETAIL_QUERY_KEY] });
      const previousTodo = queryClient.getQueryData([
        TODO_DETAIL_QUERY_KEY,
        updatedTodoItem.itemId,
      ]);

      queryClient.setQueryData(
        [TODO_DETAIL_QUERY_KEY, updatedTodoItem.itemId],
        (old: unknown) => {
          const oldTodo = (old as TodoItem) || {
            name: "",
            memo: "",
            isCompleted: false,
          };
          return {
            ...oldTodo,
            name: updatedTodoItem.updateTodoDto.name ?? oldTodo.name,
            memo: updatedTodoItem.updateTodoDto.memo ?? oldTodo.memo,
            isCompleted:
              updatedTodoItem.updateTodoDto.isCompleted ?? oldTodo.isCompleted,
          };
        }
      );

      const previousTodos = queryClient.getQueryData([TODOS_QUERY_KEY]);
      if (previousTodos && Array.isArray(previousTodos)) {
        queryClient.setQueryData(
          [TODOS_QUERY_KEY],
          (old: TodoItemSummary[]) => {
            return old.map((todo) => {
              return todo.id === updatedTodoItem.itemId
                ? {
                    ...todo,
                    name: updatedTodoItem.updateTodoDto.name ?? todo.name,
                    isCompleted:
                      updatedTodoItem.updateTodoDto.isCompleted ??
                      todo.isCompleted,
                  }
                : todo;
            });
          }
        );
      }
      return { previousTodo, previousTodos };
    },
    onError: (_error, updatedTodoItem, context) => {
      if (context) {
        queryClient.setQueryData(
          [TODO_DETAIL_QUERY_KEY, updatedTodoItem.itemId],
          context?.previousTodo
        );
        queryClient.setQueryData([TODOS_QUERY_KEY], context?.previousTodos);
      }
      const todoName = updatedTodoItem?.updateTodoDto?.name || "TODO";

      showToast(
        `"${textShortener(todoName, 18)}" 항목이 수정에 실패했습니다`,
        "failed"
      );
    },
    onSuccess: (_data, updatedTodoItem) => {
      const todoName = updatedTodoItem?.updateTodoDto?.name || "TODO";
      showToast(
        `"${textShortener(todoName, 18)}" 항목이 수정되었습니다`,
        "success"
      );
    },
    onSettled: (_data, _error, updatedTodoItem) => {
      queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [TODO_DETAIL_QUERY_KEY, updatedTodoItem?.itemId],
      });
    },
  });
  return mutate;
}
