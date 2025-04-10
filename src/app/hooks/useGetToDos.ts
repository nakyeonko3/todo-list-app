import { getTodos } from "@/app/api/api";
import { TODOS_QUERY_KEY } from "@/app/constants";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useGetToDos() {
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: [TODOS_QUERY_KEY],
    queryFn: () => getTodos(),
  });

  return { data, isLoading, isError };
}
