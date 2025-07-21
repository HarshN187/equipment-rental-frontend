import { useEffect, useState } from "react";
import { equipmentApi } from "../../api";
import MyDataTable from "../Datatable/MyDataTable";
import type { EquipmentData } from "../../types/equipment.types";
import { Bounce, toast } from "react-toastify";

function EquipmentTable() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await equipmentApi.getAll();

    const mappedData = response.data.map((ele, index: number) => {
      return { ...ele, id: index + 1, category: ele.category.name };
    });
    console.log(mappedData);

    setData(mappedData);
  };

  const handleDeleteClick = async (data) => {
    try {
      console.log(data);
      // alert({ ...data });
      if (confirm("are you sure want to delete")) {
        await equipmentApi.delete({ id: data.e_id });
        fetchData();
      }
    } catch (e) {
      console.log(e);
      toast.error("Error during Deleting Equipment!", {
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
          // onClick={() => handleEditClick(rowData)}
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

  useEffect(() => {
    fetchData();
  }, []);

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
    </>
  );
}

export default EquipmentTable;
