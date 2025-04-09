import returnFetch from "return-fetch";

export const BASE_URL = process.env.NEXT_BASE_URL || "http://localhost:3000";

const customFetch = returnFetch({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  interceptors: {
    response: async (response) => {
      if (response.status >= 400) {
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
