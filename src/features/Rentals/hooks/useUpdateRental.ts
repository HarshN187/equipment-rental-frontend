import { Flip, toast } from "react-toastify";
import { rentalApi } from "../../../api";
import type { RentalData } from "../../../types/rentals.types";
import { useMutation } from "@tanstack/react-query";
import type { RefetchFunction } from "../../../types/refetch.types";

export function useUpdateRental(
  setSelectedRental: React.Dispatch<React.SetStateAction<any>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  refetch: RefetchFunction<any, Error>
) {
  return useMutation({
    mutationFn: (updatedRental: RentalData) => rentalApi.patch(updatedRental),
    onSuccess: (_res,_updatedRent) => {
      toast.success(`Rental Successfully Updated!`, {
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
      setIsModalOpen(false);
      setSelectedRental(null);
    },
    onError: (err, _updatedRent) => {
      console.error("Error Updating Rental:", err);
      toast.error(`Failed to update ${"rental"}!`, {
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
