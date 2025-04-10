import { getTodoById } from "@/app/api/api";
import { TODO_DETAIL_QUERY_KEY } from "@/app/constants";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useGetToDoDetail(todoId: number) {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: [TODO_DETAIL_QUERY_KEY, todoId],
    queryFn: () => getTodoById(todoId),
  });

  if (error && !isFetching) {
    throw error;
  }

  return { data };
}
