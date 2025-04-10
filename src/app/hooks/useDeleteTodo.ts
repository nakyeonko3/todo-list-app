import { deleteTodo, TodoItemSummary } from "@/app/api/api";
import { TODOS_QUERY_KEY } from "@/app/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteTodo() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (todoId) => {
      queryClient.cancelQueries({ queryKey: [TODOS_QUERY_KEY] });
      const previousTodos = queryClient.getQueryData([TODOS_QUERY_KEY]);
      queryClient.setQueryData([TODOS_QUERY_KEY], (old: TodoItemSummary[]) => {
        {
          if (!old) return [];
          return [...old.filter((todo) => todo.id !== todoId)];
        }
      });
      return { previousTodos };
    },
    onError: (_error, _todoId, context) => {
      queryClient.setQueryData([TODOS_QUERY_KEY], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] });
    },
  });
  return mutate;
}
