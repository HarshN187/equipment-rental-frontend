import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { equipmentApi } from "../../../api";

export function useGetEquipments() {
  const fetchData = async () => {
    const response = await equipmentApi.getAll();

    const mappedData = response.data.map((ele, index: number) => {
      return {
        ...ele,
        id: index + 1,
        category: ele.category.name,
        category_id: ele.category.cat_id,
      };
    });

    return mappedData;
  };

  return useQuery({
    queryKey: ["equipments"],
    queryFn: fetchData,
    placeholderData: keepPreviousData,
  });
}
