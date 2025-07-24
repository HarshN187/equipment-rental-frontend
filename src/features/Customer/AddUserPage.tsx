import { AddUserForm } from "../../components";

function AddUserPage() {
  return (
    <div>
      <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* <Header heading="" paragraph="" linkName="Add New User" linkUrl="/" /> */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Customer
          </h2>
          <AddUserForm></AddUserForm>
        </div>
      </div>
    </div>
  );
}

export default AddUserPage;
