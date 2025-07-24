import { useNavigate } from "react-router-dom";
import type { RentalData } from "../../../types/rentals.types";
import { rentalApi } from "../../../api";
import { useMutation } from "@tanstack/react-query";
import { Flip, toast } from "react-toastify";

export function useCreateRental() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RentalData) => rentalApi.post(data),
    onSuccess: (_res, _newRent) => {
      toast.success(`Successfully Rental created !`, {
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
      navigate("/rentals");
    },
    onError: (err, _newRent) => {
      console.error("Error Creating Rental:", err);
      toast.error(`Failed to Create ${"rental"}!`, {
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
