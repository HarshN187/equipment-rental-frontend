import { AddRentalForm } from "../../components";

function AddRentalPage() {
  return (
    <div className=" bg-gray-50 flex flex-col items-center justify-center pt-12 px-4 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-center text-4xl font-extrabold text-gray-900">
        Add New Rental
      </h2>
      <div className="w-full max-w-2xl">
        {" "}
        <AddRentalForm />
      </div>
    </div>
  );
}

export default AddRentalPage;
