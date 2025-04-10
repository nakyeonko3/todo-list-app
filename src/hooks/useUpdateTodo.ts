import { TodoItem, TodoItemSummary, updateTodo } from "@/api/api";
import { TODO_DETAIL_QUERY_KEY, TODOS_QUERY_KEY } from "@/constants/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateTodo() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: [TODOS_QUERY_KEY] });
      const previousTodos = queryClient.getQueryData([TODOS_QUERY_KEY]);
      queryClient.setQueryData([TODOS_QUERY_KEY], (old: TodoItemSummary[]) => {
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
      queryClient.setQueryData(
        [TODO_DETAIL_QUERY_KEY, newTodo.itemId],
        (old: unknown) => {
          const typedOld = old as TodoItem;
          return {
            id: newTodo.itemId ?? typedOld.id,
            imageUrl: newTodo.updateTodoDto.imageUrl ?? typedOld.imageUrl,
            memo: newTodo.updateTodoDto.memo ?? typedOld.memo,
            name: newTodo.updateTodoDto.name ?? typedOld.name,
            isCompleted:
              newTodo.updateTodoDto.isCompleted ?? typedOld.isCompleted,
          };
        }
      );
      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData([TODOS_QUERY_KEY], context?.previousTodos);
    },
  });
  return mutate;
}
