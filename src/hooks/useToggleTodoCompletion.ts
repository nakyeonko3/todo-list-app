import { TodoItemSummary, updateTodo } from "@/api/api";
import { TODO_DETAIL_QUERY_KEY, TODOS_QUERY_KEY } from "@/constants/queries";
import { showToast } from "@/utils/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useToggleTodoCompletion() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: [TODOS_QUERY_KEY] });
      const previousTodos = queryClient.getQueryData([TODOS_QUERY_KEY]);
      if (previousTodos && Array.isArray(previousTodos)) {
        queryClient.setQueryData(
          [TODOS_QUERY_KEY],
          (old: TodoItemSummary[]) => {
            return (old as TodoItemSummary[]).map((todo) =>
              todo.id === newTodo.itemId
                ? {
                    id: todo.id,
                    name: todo.name,
                    isCompleted: newTodo.updateTodoDto.isCompleted,
                  }
                : todo
            );
          }
        );
      }
      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData([TODOS_QUERY_KEY], context?.previousTodos);
      queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] });
      showToast("TODO 수정에 실패했습니다", "failed");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [TODO_DETAIL_QUERY_KEY, data.id],
      });
    },
  });
  return mutate;
}
