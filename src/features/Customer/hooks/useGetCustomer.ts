import { useInfiniteQuery } from "@tanstack/react-query";
import { customerApi } from "../../../api";

interface UserData {
  user_id: string;
  name: string;
  email: string;
  phone: string;
}

interface GetUserPaginationResponse {
  userData: UserData[];
  total_count: number;
}

export function useGetCustomer(searchQuery: string, perPage: number) {
  return useInfiniteQuery<
    GetUserPaginationResponse,
    Error,
    GetUserPaginationResponse,
    string[],
    number
  >({
    queryKey: ["users", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await customerApi.getUserPagination({
        page: pageParam,
        limit: perPage,
        query: searchQuery,
      });
    
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage.total_count;
      const loadedCount = allPages.reduce(
        (acc, page) => acc + page.userData.length,
        0
      );
      if (loadedCount < totalCount) {
        return allPages.length + 1;
      }
      return undefined;
    },

    initialPageParam: 1,
    placeholderData: (previousData) => previousData,
  });
}
