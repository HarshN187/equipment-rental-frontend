import React, { useEffect, useState, type JSX } from "react";
import { equipmentApi } from "../../../api";
import MyDataTable from "../../../components/Datatable/MyDataTable";
import { Link } from "react-router-dom";
import AddCategoryModal from "./addCategoryModal";

interface Category {
  cat_id: number;
  name: string;
  description: string;
}

interface MyColumn {
  field?: string;
  header: string;
  body?: (rowData: any, options: any) => React.ReactNode;
  sortable?: boolean;
  exportable?: boolean;
  style?: React.CSSProperties;
}

function CategoryTable(): JSX.Element {
  const [data, setData] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await equipmentApi.getCategory();

      const mappedData = response.data.map((ele, index: number) => {
        return { ...ele, id: index + 1 };
      });

      setData(mappedData as Category[]);
    } catch (e) {
      console.error("Error fetching categories:", e);
      alert("An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCategoryClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCategoryAdded = () => {
    fetchData();
    setIsModalOpen(false);
  };

  const columns: MyColumn[] = [
    { field: "id", header: "ID" },
    { field: "name", header: "Name" },
    { field: "description", header: "Description" },
    {
      header: "Actions",
      body: (rowData: Category) => (
        <Link to={`/category/product/${rowData.cat_id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">
            View
          </button>
        </Link>
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
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddCategoryClick}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Category
        </button>
      </div>
      <MyDataTable
        data={data}
        scrollable={false}
        rowClass={rowClass}
        columns={columns}
      />

      {isModalOpen && (
        <AddCategoryModal
          onClose={handleCloseModal}
          onCategoryAdded={handleCategoryAdded}
        />
      )}
    </>
  );
}

export default CategoryTable;
