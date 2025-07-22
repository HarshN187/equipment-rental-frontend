import { useEffect, useState, type JSX } from "react";
import { rentalApi } from "../../../api";
import { MyTable } from "../../../components";
import { formatDateHTML } from "../../../utils/formateDate";
import { EditRentalModal } from "./EditRentalModal";
import type { RentalData } from "../../../types/rentals.types";
import { Bounce, toast } from "react-toastify";

function RentalListTable(): JSX.Element {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState<any>();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRental(null);
  };

  const handleEditClick = async (rental: RentalData) => {
    // console.log(rental);
    const rentalData = await rentalApi.getOne({ id: Number(rental.id) });

    setSelectedRental(rentalData.data);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedRental: RentalData) => {
    console.log(updatedRental);

    try {
      const response = await rentalApi.patch(updatedRental);
      console.log(response);
    } catch (e) {
      toast.error("Error during updating Rental!", {
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
    alert("submitted");
    setIsModalOpen(false);
    setSelectedRental(null);
  };

  const fetchData = async () => {
    try {
      const response = await rentalApi.getAll();

      const mappedData = response.data.map((ele, index: number) => {
        return {
          e_id: index + 1,
          id: ele.id,
          customer: ele.user.name,
          equipment: ele.equipment.name,
          quantity: ele.quantity,
          start_date: formatDateHTML(ele.start_date),
          end_date: formatDateHTML(ele.end_date),
          payment_status: ele.payment_status,
          status: ele.status,
        };
      });

      setData(mappedData);
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    { field: "e_id", header: "ID" },
    { field: "customer", header: "Customer" },
    { field: "equipment", header: "Equipment" },
    { field: "quantity", header: "Quantity" },
    { field: "start_date", header: "start_date" },
    { field: "end_date", header: "end_date" },
    { field: "payment_status", header: "Payment Status" },
    { field: "status", header: "Order Status" },
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
  ];

  useEffect(() => {
    fetchData();
  }, []);

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
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default RentalListTable;
