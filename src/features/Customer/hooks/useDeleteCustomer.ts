import { useMutation } from "@tanstack/react-query";
import { Flip, toast } from "react-toastify";
import type { UserData } from "../../../types/user.types";
import { customerApi } from "../../../api";
import type { RefetchFunction } from "../../../types/refetch.types";

export function useDeleteUser(refetch: RefetchFunction<any, Error>) {
  return useMutation({
    mutationFn: (user: UserData) => {
      return customerApi.deleteUser({ id: Number(user.user_id) });
    },
    onSuccess: (response, userToDelete) => {
      toast.success(`${userToDelete.name} Successfully Deleted!`, {
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
    onError: (err, userToDelete) => {
      console.error("Error deleting user:", err);
      toast.error(`Failed to delete ${userToDelete?.name || "user"}!`, {
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
