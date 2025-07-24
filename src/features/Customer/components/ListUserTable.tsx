// import { useEffect, useRef, useState } from "react";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { Bounce, toast } from "react-toastify";
// import { customerApi } from "../../../api";
// import { EditUserModal } from "./EditUserModel";
// import PaginationButton from "../../../components/Datatable/PaginationButton";
// import { useDeleteUser } from "../hooks/useDeleteCustomer";
// import { useUpdateUser } from "../hooks/useUpdateCustomer";

// interface UserData {
//   user_id: string;
//   name: string;
//   email: string;
//   phone: string;
// }

// function ListUserTable() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
//   const [totalPages, setTotalPages] = useState(1);
//   // const { id } = useParams();
//   const [pageNumber, setPage] = useState(1);
//   const [perPage, setPerPage] = useState(5);
//   const [searchQuery, setSearchquery] = useState<string>("");
//   const currentTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const { data, isError, isLoading, refetch, error } = useQuery({
//     queryKey: ["users", pageNumber, perPage, searchQuery],
//     queryFn: () =>
//       customerApi.getUserPagination({
//         page: pageNumber,
//         limit: perPage,
//         query: searchQuery,
//       }),
//     // gcTime: 1000,
//     // staleTime: 10000,
//     // refetchInterval: 2000,
//     // refetchIntervalInBackground: true,
//     placeholderData: keepPreviousData,
//   });

//   // Debouncing
//   const handleSearchEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (currentTimeout.current) clearTimeout(currentTimeout.current);
//     currentTimeout.current = setTimeout(() => {
//       setSearchquery(e.target.value);
//     }, 1000);
//   };

//   const deleteMutation = useDeleteUser(refetch);

//   const handleDeleteClick = (user: UserData) => {
//     if (confirm(`Are you sure you want to delete ${user.name}?`)) {
//       deleteMutation.mutate(user);
//     }
//   };

//   const updateMutation = useUpdateUser(
//     refetch,
//     setIsModalOpen,
//     setSelectedUser
//   );

//   useEffect(() => {
//     if (data) setTotalPages(Math.ceil(data.data.total_count / perPage));
//   }, [data, perPage, pageNumber]);

//   if (isLoading) {
//     return toast.info("Data Loading !", {
//       position: "top-right",
//       autoClose: 1000,
//       hideProgressBar: true,
//       closeOnClick: false,
//       pauseOnHover: false,
//       draggable: true,
//       theme: "colored",
//       transition: Bounce,
//     });
//   }

//   if (isError) {
//     return toast.error("Error occurred while data fetching !", {
//       position: "top-right",
//       autoClose: 2000,
//       hideProgressBar: false,
//       closeOnClick: false,
//       pauseOnHover: false,
//       draggable: true,
//       progress: undefined,
//       theme: "dark",
//       transition: Bounce,
//     });
//   }

//   if (!data) return null;

//   const handleEditClick = (user: UserData) => {
//     setSelectedUser(user);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedUser(null);
//   };

//   return (
//     <div className="overflow-hidden bg-white rounded-lg shadow-lg container">
//       <div className="flex justify-end">
//         <input
//           type="text"
//           className="border-1 border-gray-400 m-2 rounded-lg p-1"
//           onChange={(e) => handleSearchEvent(e)}
//         />
//       </div>
//       <div className="overflow-y-scroll max-h-[400px]">
//         <table className="min-w-full table-auto">
//           <thead className="sticky top-0">
//             <tr className="bg-gray-100 text-gray-600">
//               <th className="py-3 px-6 text-left">#</th>
//               <th className="py-3 px-6 text-left">Name</th>
//               <th className="py-3 px-6 text-left">Email</th>
//               <th className="py-3 px-6 text-left">Phone</th>
//               <th className="py-3 px-6 text-left">Actions</th>
//               <th className="py-3 px-6 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.data.userData.length === 0 ? (
//               <tr>
//                 <td colSpan={5} className="text-center py-4">
//                   No users found
//                 </td>
//               </tr>
//             ) : (
//               data.data.userData.map((user: UserData, index: number) => (
//                 <tr key={index} className="border-b hover:bg-gray-50">
//                   <td className="py-3 pl-6 text-left ">
//                     {index + 1 + (pageNumber - 1) * perPage}
//                   </td>
//                   <td className="py-3 text-left">{user.name}</td>
//                   <td className="py-3 text-left">{user.email}</td>
//                   <td className="py-3 text-left">{user.phone}</td>
//                   <td className="py-3 px-6">
//                     <button
//                       className="text-blue-600 hover:text-blue-800"
//                       onClick={() => handleEditClick(user)}
//                     >
//                       Edit
//                     </button>
//                   </td>
//                   <td className="py-3 px-6">
//                     <button
//                       className="text-blue-600 hover:text-blue-800"
//                       onClick={() => handleDeleteClick(user)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <PaginationButton
//         perPage={perPage}
//         setPerPage={setPerPage}
//         setPage={setPage}
//         pageNumber={pageNumber}
//         totalPages={totalPages}
//       ></PaginationButton>

//       {isModalOpen && selectedUser && (
//         <EditUserModal
//           user={selectedUser}
//           onClose={handleCloseModal}
//           onSave={updateMutation}
//         />
//       )}
//     </div>
//   );
// }

// export default ListUserTable;

import { useEffect, useRef, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { EditUserModal } from "./EditUserModel";
import PaginationButton from "../../../components/Datatable/PaginationButton";
import { useDeleteUser } from "../hooks/useDeleteCustomer";
import { useUpdateUser } from "../hooks/useUpdateCustomer";
import { useGetCustomer } from "../hooks/useGetCustomer";

interface UserData {
  user_id: string;
  name: string;
  email: string;
  phone: string;
}

function ListUserTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageNumber, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchQuery, setSearchquery] = useState<string>("");
  const currentTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCustomer(searchQuery, perPage);
  console.log(data);
  // Debouncing
  const handleSearchEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTimeout.current) clearTimeout(currentTimeout.current);
    currentTimeout.current = setTimeout(() => {
      setSearchquery(e.target.value);
      setPage(1);
    }, 1000);
  };

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
    //@ts-ignore
    if (data?.pages && data.pages.length > 0) {
      //@ts-ignore
      const firstPageData = data.pages[0];
      setTotalPages(Math.ceil(firstPageData.total_count / perPage));
    }
  }, [data, perPage]);

  useEffect(() => {
    // When pageNumber changes, we need to manually trigger fetching the specific page
    // This is a workaround for traditional pagination with useInfiniteQuery

    if (data?.pages.length < pageNumber && hasNextPage && !isFetchingNextPage) {
      fetchNextPage({ pageParam: pageNumber });
    }
  }, [
    pageNumber,
    perPage,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
  ]);

  if (isLoading) {
    toast.info("Data Loading !", {
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
    toast.error(
      `Error occurred while data fetching: ${
        error?.message || "Unknown error"
      }`,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      }
    );
  }
  const allUsersAcrossPages =
    data?.pages.flatMap((page) => page.userData) || [];

  const startIndex = (pageNumber - 1) * perPage;
  const endIndex = startIndex + perPage;
  const usersForCurrentPage = allUsersAcrossPages.slice(startIndex, endIndex);

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
      <div className="flex justify-end">
        <input
          type="text"
          className="border-1 border-gray-400 m-2 rounded-lg p-1"
          onChange={(e) => handleSearchEvent(e)}
        />
      </div>
      <div className="overflow-y-scroll max-h-[380px]">
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
            {usersForCurrentPage.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              usersForCurrentPage.map((user: UserData, index: number) => (
                <tr key={user.user_id} className="border-b hover:bg-gray-50">
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
        setPerPage={(newPerPage) => {
          setPerPage(newPerPage);
          setPage(1);
          refetch();
        }}
        setPage={setPage}
        pageNumber={pageNumber}
        totalPages={totalPages}
      />
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
