import { ListUserTable } from "../../components";

const UserListPage = () => {
  return (
    <>
      <div className="container mx-auto p-6">
        {/* Fixed header for User List */}
        <h1 className="text-3xl font-semibold mb-6 sticky top-24  z-10 border-b-1 border-gray-200">
          Customers
        </h1>

        <ListUserTable></ListUserTable>
      </div>
    </>
  );
};

export default UserListPage;
