import { createTodo, TodoItemSummary } from "@/api/api";
import { TODOS_QUERY_KEY } from "@/constants/queries";

import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 낙관적 업데이트가 포함된 새로운 할 일 항목을 생성하기 위한 커스텀 훅입니다.
 *
 * 이 훅은 React Query의 뮤테이션 기능을 활용하여:
 * - API 호출을 통해 새 할 일 항목을 생성합니다
 * - 낙관적 UI 업데이트를 구현합니다(API 호출이 완료되기 전에 할 일 목록에 추가)
 * - 오류 발생 시 롤백을 처리합니다(API 호출이 실패할 경우 이전 상태로 되돌림)
 * - 뮤테이션 완료 후 데이터를 새로고침합니다
 *
 * @returns 새 할 일 항목 생성을 트리거하는 mutate 함수
 *
 * @example
 * ```tsx
 * const createTodo = useCreateTodo();
 *
 * // 컴포넌트 내에서 사용 예시
 * const handleSubmit = () => {
 *   createTodo({ title: "새 작업", description: "작업 세부 사항" });
 * };
 * ```
 */
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
