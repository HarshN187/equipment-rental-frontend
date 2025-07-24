import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { customerApi } from "../../../api";
import type { UserData } from "../../../types/user.types";
import { Flip, toast } from "react-toastify";

export function useAddCustomer() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: UserData) => customerApi.post(data),
    onSuccess: (_res, _newCustomer) => {
      toast.success(`Successfully Customer Added !`, {
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
      navigate("/customer");
    },
    onError: (err, _newCust) => {
      console.error("Error Creating Customer:", err);
      toast.error(err.message || `Failed to Create Customer!`, {
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
