import { useNavigate } from "react-router-dom";
import type { RentalData } from "../../../types/rentals.types";
import { rentalApi } from "../../../api";
import { useMutation } from "@tanstack/react-query";
import { Flip, toast } from "react-toastify";

export function useCreateRental() {
  const navigate = useNavigate();

  const onsubmit = async (data: RentalData) => {
    try {
      const response = await rentalApi.post(data);

      //   return response;
    } catch (e) {
      console.error("Error fetching data:", e);
      alert("Failed to post rental data. Please try again.");
    }
  };

  return useMutation({
    mutationFn: (data: RentalData) => onsubmit(data),
    onSuccess: (res, newRent) => {
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
    onError: (err, newRent) => {
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
