/**
 * Todo 목록 데이터를 가져오는 커스텀 훅
 *
 * - React Query의 useSuspenseQuery를 활용한 데이터 페칭
 * - Suspense 패턴을 사용하여 로딩 상태 처리
 * - 5분 캐싱으로 불필요한 네트워크 요청 최소화
 */
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
