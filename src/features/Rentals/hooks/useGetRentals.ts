import { useQuery } from "@tanstack/react-query";
import { rentalApi } from "../../../api";
import { formatDateHTML } from "../../../utils/formateDate";

const fetchData = async () => {
  try {
    const response = await rentalApi.getAll();
    console.log(response);

    //@ts-ignore
    const mappedData = response.data.map((ele, index: number) => {
      return {
        e_id: index + 1,
        id: ele.id,
        customer: ele.user ? ele.user.name : "Deleted Customer",
        equipment: ele.equipment ? ele.equipment.name : "Deleted Equipment",
        quantity: ele.quantity,
        start_date: formatDateHTML(ele.start_date),
        end_date: formatDateHTML(ele.end_date),
        payment_status: ele.payment_status,
        status: ele.status,
      };
    });

    console.log(mappedData);

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
