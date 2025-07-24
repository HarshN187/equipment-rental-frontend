import { useMutation } from "@tanstack/react-query";
import { equipmentApi } from "../../../api";
import type { EquipmentData } from "../../../types/equipment.types";
import { Flip, toast } from "react-toastify";

export function useAddEquipment() {
  return useMutation({
    mutationFn: (data: EquipmentData) => equipmentApi.post(data),
    onSuccess: (_res, _newCustomer) => {
      toast.success(`Successfully Equipment Added !`, {
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
    },
    onError: (err, _newCust) => {
      console.error("Error Creating Equipment:", err);
      toast.error(err.message || `Failed to add Equipment!`, {
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
