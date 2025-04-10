import { TodoItemSummary } from "@/app/api/api";

/**
 * 완료 상태에 따라 Todo 아이템을 필터링하는 함수
 * @param items Todo 아이템 배열
 * @param isCompleted 완료 상태 (true: 완료, false: 미완료)
 * @returns 필터링된 Todo 아이템 배열
 */
export function filterTodoItemsByStatus(
  items: TodoItemSummary[],
  isCompleted: boolean
) {
  return items.filter((item) => item.isCompleted === isCompleted);
}
