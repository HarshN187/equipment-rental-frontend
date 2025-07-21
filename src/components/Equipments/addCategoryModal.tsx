// AddCategoryModal.tsx
import { type JSX } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { equipmentApi } from "../../api";
import {
  categorySchema,
  type CategoryFormData,
} from "../../types/category.types";
import { Flip, toast } from "react-toastify";
import { addCategoryFields } from "../../constants/formFields";
import { Input } from "../Form/Input";
import FormModal from "../Form/FormModal";

interface AddCategoryModalProps {
  onClose: () => void;
  onCategoryAdded: () => void;
}

function AddCategoryModal({
  onClose,
  onCategoryAdded,
}: AddCategoryModalProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await equipmentApi.addCategory(data);
      onCategoryAdded();
      reset();
      toast.success(`Category Added Successfully !`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  };

  return (
    // <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
    //   <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
    <>
      <FormModal>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add New Category</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category Name:
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter category name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div> */}

          <div className="mb-4">
            {addCategoryFields.map((ele, index: number) => (
              <Input
                key={index}
                labelText={ele.labelText}
                labelFor={ele.labelFor}
                name={ele.name}
                type={ele.type}
                placeholder={ele.placeholder}
                register={register}
                error={errors[ele.name]}
              />
            ))}
          </div>

          {/* <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description (Optional) :
            </label>
            <textarea
              id="description"
              {...register("description")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.description ? "border-red-500" : ""
              }`}
              placeholder="Enter category description"
              rows={3}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                {errors.description.message}
              </p>
            )}
          </div> */}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              Add Category
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </FormModal>
    </>

    //   </div>
    // </div>
  );
}

export default AddCategoryModal;
