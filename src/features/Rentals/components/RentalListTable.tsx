import { useState, type JSX } from "react";
import { rentalApi } from "../../../api";
import { MyTable } from "../../../components";
import { EditRentalModal } from "./EditRentalModal";
import type { RentalData } from "../../../types/rentals.types";
import { useGetRentals } from "../hooks/useGetRentals";
import { useUpdateRental } from "../hooks/useUpdateRental";
import { Flip, toast } from "react-toastify";

function RentalListTable(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState<any>();
  const { data, isError, error, refetch } = useGetRentals();

  if (isError) {
    toast.error(error.message || `Failed to fetch Equipments!`, {
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRental(null);
  };

  const handleEditClick = async (rental: RentalData) => {
    const rentalData = await rentalApi.getOne({ id: Number(rental.id) });

    setSelectedRental(rentalData.data);
    setIsModalOpen(true);
  };

  const updateMutation = useUpdateRental(
    setSelectedRental,
    setIsModalOpen,
    refetch
  );

  const columns = [
    { field: "e_id", header: "ID" },
    { field: "customer", header: "Customer" },
    { field: "equipment", header: "Equipment" },
    { field: "quantity", header: "Quantity" },
    { field: "start_date", header: "start_date" },
    { field: "end_date", header: "end_date" },
    { field: "payment_status", header: "Payment Status" },
    // { field: "status", header: "Order Status" },
    {
      header: "Actions",
      body: (rowData: RentalData) => (
        <button
          onClick={() => handleEditClick(rowData)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
        >
          Edit
        </button>
      ),
      exportable: false,
      style: { width: "8rem" },
    },
    {
      header: "Actions",
      body: (rowData: RentalData) => (
        <button
          // onClick={() => handleEditClick(rowData)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm disabled:bg-blue-300"
          //@ts-ignore
          disabled={rowData.status != "active"}
        >
          {
            //@ts-ignore
            rowData.status == "active" ? "complete" : "Completed"
          }
        </button>
      ),
      exportable: false,
      style: { width: "8rem" },
    },
  ];

  const rowClass = () => {
    return "py-2 text-lg my-2 hover:bg-gray-100 cursor-pointer";
  };

  return (
    <>
      <div>
        <MyTable data={data} rowClass={rowClass} columns={columns}></MyTable>
      </div>
      {isModalOpen && selectedRental && (
        <EditRentalModal
          rental={selectedRental}
          onClose={handleCloseModal}
          onSave={updateMutation}
        />
      )}
    </>
  );
}

export default RentalListTable;
