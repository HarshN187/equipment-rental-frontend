import { ListUserTable } from "../../components";
import { useGetCustomer } from "./hooks/useGetCustomer";

const UserListPage = () => {
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    status,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useGetCustomer();

  // console.log(data);

  return (
    <>
      <div className="container mx-auto p-6">
        {/* Fixed header for User List */}
        <h1 className="text-3xl font-semibold mb-6 sticky top-24  z-10 border-b-1 border-gray-200">
          Customers
        </h1>
        <button onClick={() => fetchNextPage()} className="border-1 p-2">
          next
        </button>

        <button onClick={() => fetchPreviousPage()} className="border-1 p-2">
          prev
        </button>
        <ListUserTable></ListUserTable>
      </div>
    </>
  );
};

export default UserListPage;
