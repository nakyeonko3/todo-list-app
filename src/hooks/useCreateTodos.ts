import { createTodo, TodoItemSummary } from "@/api/api";
import { TODOS_QUERY_KEY } from "@/app/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateTodo() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: [TODOS_QUERY_KEY] });
      const previousTodos = queryClient.getQueryData([TODOS_QUERY_KEY]);
      queryClient.setQueryData([TODOS_QUERY_KEY], (old: TodoItemSummary[]) => {
        return [
          {
            ...newTodo,
            id: `temp-${Date.now()}`,
            isCompleted: false,
          },
          ...old,
        ];
      });
      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData([TODOS_QUERY_KEY], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] });
    },
  });
  return mutate;
}
