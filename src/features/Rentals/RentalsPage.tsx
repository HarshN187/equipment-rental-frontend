import { RentalListTable } from "../../components";

function RentalsPage() {
  return (
    <div>
      <div className="container mx-auto p-6 ">
        <h1 className="text-3xl font-semibold mb-6 sticky top-24  z-10 border-b-2 border-gray-200">
          Rentals
        </h1>

        <RentalListTable></RentalListTable>
      </div>
    </div>
  );
}

export default RentalsPage;
