import { useQuery } from "@tanstack/react-query";
import { rentalApi } from "../../../api";
import { formatDateHTML } from "../../../utils/formateDate";

const fetchData = async () => {
  try {
    const response = await rentalApi.getAll();

    const mappedData = response.data.map((ele, index: number) => {
      return {
        e_id: index + 1,
        id: ele.id,
        customer: ele.user.name,
        equipment: ele.equipment.name,
        quantity: ele.quantity,
        start_date: formatDateHTML(ele.start_date),
        end_date: formatDateHTML(ele.end_date),
        payment_status: ele.payment_status,
        status: ele.status,
      };
    });

    return mappedData;
  } catch (e) {
    console.log(e);
  }
};

export function useGetRentals() {
  return useQuery({
    queryKey: ["rentals"],
    queryFn: fetchData,
  });
}
