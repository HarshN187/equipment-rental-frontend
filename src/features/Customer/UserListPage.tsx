import type { FC } from "react";
import ListUserTable from "./components/ListUserTable";

const UserListPage: FC = () => {
  return (
    <>
      <div className="container mx-auto px-6 pt-4">
        <h1 className="text-3xl font-semibold mb-6 sticky top-24  z-10 border-b-1 border-gray-200">
          Customers
        </h1>
        <ListUserTable></ListUserTable>
      </div>
    </>
  );
};

export default UserListPage;
