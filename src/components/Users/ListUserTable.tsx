import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bounce, Flip, toast } from "react-toastify";
import { userApi } from "../../api";
import { EditUserModal } from "./EditUserModel";

interface UserData {
  user_id: string;
  name: string;
  email: string;
  phone: string;
}

function ListUserTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.getAll,
  });
  console.log(data);

  if (isLoading)
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

  if (error)
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

  if (!data) return null;

  const handleEditClick = (user: UserData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (user: UserData) => {
    if (confirm(`are you sure you want to delete ${user.name}`)) {
      try {
        await userApi.deleteUser({ id: Number(user.user_id) });
        toast.success(`${user.name} Successfully Deleted !`, {
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
      } catch (error) {
        console.log(error);
        toast.error(`Something Went Wrong`, {
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
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      console.log(updatedUser);
      const response = await userApi.patch(updatedUser);
      console.log(response);
      toast.success("User updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsModalOpen(false);
      setSelectedUser(null);
      refetch();
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Error during updating user!", {
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
  };

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-lg">
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
            {data.data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              data.data.map(
                (
                  user: UserData,
                  index: number // Ensure user has id
                ) => (
                  <tr
                    key={user.user_id || index}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 pl-6 text-left ">{index + 1}</td>
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
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}

export default ListUserTable;
