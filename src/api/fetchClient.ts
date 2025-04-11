import returnFetch from "return-fetch";

export const BASE_URL = process.env.NEXT_BASE_URL || "http://localhost:3000";

// axios와 비슷한 형태로 공통된 baseURL과 헤더를 설정할 수 있는 return-fetch 라이브러리를 사용하여 fetch 클라이언트를 만들었습니다.
const customFetch = returnFetch({
  baseUrl: "https://assignment-todolist-api.vercel.app/api/v31232/",
  headers: {
    Accept: "application/json",
  },
  interceptors: {
    response: async (response) => {
      if (response.status >= 400) {
        console.error(
          `Error: ${response.status} ${response.statusText} - ${response.url}`
        );
        throw new Error(await response.text());
      }
      return response;
    },
  },
});

export async function fetchClient<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await customFetch(url, options);

  if (response.headers.get("content-type")?.includes("application/json")) {
    return response.json();
  }

  return response.text() as unknown as T;
}
