import { getTodoById } from "@/api/api";
import { TODO_DETAIL_QUERY_KEY } from "@/constants/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useGetToDoDetail(todoId: number) {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: [TODO_DETAIL_QUERY_KEY, todoId],
    queryFn: () => getTodoById(todoId),
    staleTime: 1000 * 60 * 5,
  });

  if (error && !isFetching) {
    throw error;
  }

  return { data };
}
