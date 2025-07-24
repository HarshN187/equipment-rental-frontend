import { useInfiniteQuery } from "@tanstack/react-query";
import { customerApi } from "../../../api";

export function useGetCustomer() {
  const fetchData = async (props) => {
    console.log(props);
    const response = await customerApi.getUserPagination({
      page: 1,
      limit: 5,
      query: "",
    });
    return response.data;
  };

  return useInfiniteQuery({
    queryKey: ["cutomersData"],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextCursor;
    },
    getPreviousPageParam(lastPage, allPages) {
      return lastPage - 1;
    },
  });
}
