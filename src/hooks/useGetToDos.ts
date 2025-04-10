import { getTodos } from "@/api/api";
import { TODOS_QUERY_KEY } from "@/constants/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useGetToDos() {
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: [TODOS_QUERY_KEY],
    queryFn: () => getTodos(),
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
}
