import { useMutation } from "@tanstack/react-query";
import type { EquipmentData } from "../../../types/equipment.types";
import { equipmentApi } from "../../../api";
import { Flip, toast } from "react-toastify";
import type { RefetchFunction } from "../../../types/refetch.types";

export function useDeleteEquipment(refetch: RefetchFunction<any, Error>) {
  return useMutation({
    mutationFn: (data: EquipmentData) =>
      equipmentApi.delete({ id: Number(data.e_id) }),
    onSuccess: (_res, _newCustomer) => {
      toast.success(`Successfully Equipments Deleted !`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
      refetch();
    },
    onError: (err, _newCust) => {
      console.error("Error Deleteing Equipment:", err);
      toast.error(err.message || `Failed to Delete Equipment!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    },
  });
}
