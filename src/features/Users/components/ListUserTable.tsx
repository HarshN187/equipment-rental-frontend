import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Bounce, toast } from "react-toastify";
import { userApi } from "../../../api";
import { EditUserModal } from "./EditUserModel";
import PaginationButton from "../../../components/Datatable/PaginationButton";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useUpdateUser } from "../hooks/useUpdateUser";

interface UserData {
  user_id: string;
  name: string;
  email: string;
  phone: string;
}

function ListUserTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  // const { id } = useParams();
  const [pageNumber, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { data, isError, isLoading, refetch, error } = useQuery({
    queryKey: ["users", pageNumber, perPage],
    queryFn: () =>
      userApi.getUserPagination({ page: pageNumber, limit: perPage }),
    // gcTime: 1000,
    // staleTime: 10000,
    // refetchInterval: 2000,
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useDeleteUser(refetch);

  const handleDeleteClick = (user: UserData) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteMutation.mutate(user);
    }
  };

  const updateMutation = useUpdateUser(
    refetch,
    setIsModalOpen,
    setSelectedUser
  );

  useEffect(() => {
    if (data) setTotalPages(Math.ceil(data.data.total_count / perPage));
  }, [data, perPage, pageNumber]);

  if (isLoading) {
    return toast.info("Data Loading !", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
      transition: Bounce,
    });
  }

  if (isError) {
    return toast.error("Error occurred while data fetching !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  if (!data) return null;

  const handleEditClick = (user: UserData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-lg container">
      <div className="overflow-y-scroll max-h-[400px]">
        <table className="min-w-full table-auto">
          <thead className="sticky top-0">
            <tr className="bg-gray-100 text-gray-600">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Actions</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.data.userData.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              data.data.userData.map((user: UserData, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 pl-6 text-left ">
                    {index + 1 + (pageNumber - 1) * perPage}
                  </td>
                  <td className="py-3 text-left">{user.name}</td>
                  <td className="py-3 text-left">{user.email}</td>
                  <td className="py-3 text-left">{user.phone}</td>
                  <td className="py-3 px-6">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-3 px-6">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleDeleteClick(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationButton
        perPage={perPage}
        setPerPage={setPerPage}
        setPage={setPage}
        pageNumber={pageNumber}
        totalPages={totalPages}
      ></PaginationButton>

      {isModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onSave={updateMutation}
        />
      )}
    </div>
  );
}

export default ListUserTable;
