import { useMutation } from "@tanstack/react-query";
import { equipmentApi } from "../../../api";
import type { EquipmentData } from "../../../types/equipment.types";
import { Flip, toast } from "react-toastify";
import type { RefetchFunction } from "../../../types/refetch.types";

export function useUpdateEquipment(
  //   setSelectedRental: React.Dispatch<React.SetStateAction<any>>,
  //   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  refetch: RefetchFunction<any, Error>
) {
  return useMutation({
    mutationFn: (data: EquipmentData) => equipmentApi.patch(data),
    onSuccess: (_res, _updatedRent) => {
      toast.success(`Equipment Successfully Updated!`, {
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
    onError: (err, _updatedRent) => {
      console.error("Error Updating Equipment:", err);
      toast.error(`Failed to update Equipment! ${err.message}`, {
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
