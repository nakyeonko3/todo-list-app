import { TodoItemSummary, updateTodo } from "@/app/api/api";
import { TODO_DETAIL_QUERY_KEY, TODOS_QUERY_KEY } from "@/app/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateTodo() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: [TODOS_QUERY_KEY] });
      const previousTodos = queryClient.getQueryData([TODOS_QUERY_KEY]);
      queryClient.setQueryData([TODOS_QUERY_KEY], (old: unknown) => {
        if (!old || !Array.isArray(old)) return [];
        return (old as TodoItemSummary[]).map((todo) =>
          todo.id === newTodo.itemId
            ? {
                id: todo.id,
                name: newTodo.updateTodoDto.name ?? todo.name,
                isCompleted:
                  newTodo.updateTodoDto.isCompleted ?? todo.isCompleted,
              }
            : todo
        );
      });
      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData([TODOS_QUERY_KEY], context?.previousTodos);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [TODO_DETAIL_QUERY_KEY, data.id],
      });
      queryClient.setQueryData([TODO_DETAIL_QUERY_KEY, data.id], data);
      queryClient.setQueryData([TODOS_QUERY_KEY], (old: TodoItemSummary[]) => {
        if (!old) return [];
        return old.map((todo) =>
          todo.id === data.id
            ? {
                id: todo.id,
                name: data.name ?? todo.name,
                isCompleted: data.isCompleted ?? todo.isCompleted,
              }
            : todo
        );
      });
    },
  });
  return mutate;
}
