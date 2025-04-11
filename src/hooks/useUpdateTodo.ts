import { TodoItem, TodoItemSummary, updateTodo } from "@/api/api";
import { TODO_DETAIL_QUERY_KEY, TODOS_QUERY_KEY } from "@/constants/queries";
import { showToast } from "@/utils/showToast";
import { textShortener } from "@/utils/textShorten";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Todo 항목을 업데이트하는 커스텀 훅으로, 낙관적 업데이트 및 오류 처리 기능을 포함합니다.
 *
 * 이 훅은 React Query의 mutation 기능을 사용하여:
 * 1. 서버 응답 전에 UI를 낙관적으로 업데이트
 * 2. 업데이트 실패 시 변경사항 복원
 * 3. 성공 또는 실패에 따른 적절한 토스트 메시지 표시
 * 4. 작업 완료 후 관련 쿼리 무효화
 *
 * 낙관적 업데이트는 상세 Todo 뷰와 Todo 목록 뷰를 모두 수정하여
 * 업데이트 과정에서 일관된 UI 경험을 보장합니다.
 *
 * @returns 다음을 포함하는 객체로 호출할 수 있는 mutation 함수:
 *  - itemId: 업데이트할 Todo의 ID
 *  - updateTodoDto: 업데이트할 Todo 속성을 포함하는 객체 (name, memo, isCompleted)
 *
 * @example
 * const updateTodo = useUpdateTodo();
 *
 * // Todo 항목 업데이트
 * updateTodo({
 *   itemId: '123',
 *   updateTodoDto: { name: '업데이트된 이름', isCompleted: true }
 * });
 */
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
