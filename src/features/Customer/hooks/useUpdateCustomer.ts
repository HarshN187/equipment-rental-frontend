import { useMutation } from "@tanstack/react-query";
import { Flip, toast } from "react-toastify";
import { customerApi } from "../../../api";
import type { RefetchFunction } from "../../../types/refetch.types";

export function useUpdateUser(
  refetch: RefetchFunction<any, Error>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedUser: React.Dispatch<React.SetStateAction<any>>
) {
  return useMutation({
    mutationFn: (updatedUser) => {
      return customerApi.patch(updatedUser);
    },
    onSuccess: (_, updatedUser) => {
      toast.success(`${updatedUser?.name} Successfully Updated!`, {
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
      setSelectedUser(null);
    },
    onError: (err, updatedUser) => {
      console.error("Error Updating user:", err);
      toast.error(`Failed to update ${updatedUser?.name || "user"}!`, {
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
