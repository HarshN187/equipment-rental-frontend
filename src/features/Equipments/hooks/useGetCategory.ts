import { useQuery } from "@tanstack/react-query";
import { equipmentApi } from "../../../api";

interface DropdownOption {
  value: number | string;
  label: string;
}

export function useGetCategoryDropDownData(
  setCategoryData: React.Dispatch<React.SetStateAction<DropdownOption[]>>
) {
  const fetchData = async () => {
    try {
      const response = await equipmentApi.getCategory();

      //@ts-ignore
      const data = response.data.map((data) => {
        return {
          value: data.cat_id,
          label: data.name,
        };
      });

      setCategoryData(data);
      return response.status;
    } catch (e) {
      alert(e);
    }
  };

  return useQuery({
    queryKey: ["category"],
    queryFn: fetchData,
  });
}
