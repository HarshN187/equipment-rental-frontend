import { useState } from "react";

import MyDataTable from "../../../components/Datatable/MyDataTable";
import type { EquipmentData } from "../../../types/equipment.types";
import EditEquipmentModal from "./EditEquipmentModal";
import { useUpdateEquipment } from "../hooks/useUpdateEquipment";
import { useDeleteEquipment } from "../hooks/useDeleteEquipment";
import { useGetEquipments } from "../hooks/useGetEquipments";

function EquipmentTable() {
  // const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquip] = useState<any>();

  // const fetchData = async () => {
  //   const response = await equipmentApi.getAll();

  //   const mappedData = response.data.map((ele, index: number) => {
  //     return {
  //       ...ele,
  //       id: index + 1,
  //       category: ele.category.name,
  //       category_id: ele.category.cat_id,
  //     };
  //   });

  //   setData(mappedData);
  // };

  const { data, refetch, error, isLoading } = useGetEquipments();

  console.log(data);

  const handleEditClick = async (data) => {
    setSelectedEquip(data);
    setIsModalOpen(true);
  };

  const deleteMutation = useDeleteEquipment(refetch);
  const handleDeleteClick = async (data: EquipmentData) => {
    if (confirm("are you sure want to delete")) {
      // await equipmentApi.delete({ id: data.e_id });
      deleteMutation.mutate(data);
    }
  };

  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: "Name" },
    { field: "category", header: "Category   " },
    { field: "total_quntity", header: "Total Quantity" },
    { field: "available_quntity", header: "Available Quantity" },
    {
      header: "Actions",
      body: (rowData: EquipmentData) => (
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
      body: (rowData: EquipmentData) => (
        <button
          onClick={() => handleDeleteClick(rowData)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
        >
          Delete
        </button>
      ),
      exportable: false,
      style: { width: "8rem" },
    },
  ];

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEquip(null);
  };

  const updateMutation = useUpdateEquipment(refetch);

  const onUpdateSubmit = (data: EquipmentData) => {
    updateMutation.mutate(data);
    // refetch();
    handleCloseModal();
  };

  const rowClass = () => {
    return "py-2 text-lg my-2 hover:bg-gray-100 cursor-pointer";
  };

  return (
    <>
      <MyDataTable
        data={data}
        scrollable={true}
        rowClass={rowClass}
        columns={columns}
      ></MyDataTable>

      {isModalOpen && selectedEquipment && (
        <EditEquipmentModal
          equipment={selectedEquipment}
          onClose={handleCloseModal}
          onSave={onUpdateSubmit}
        ></EditEquipmentModal>
      )}
    </>
  );
}

export default EquipmentTable;
