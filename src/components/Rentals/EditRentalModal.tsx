import { Input } from "../Form/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rentalSchema, type RentalData } from "../../types/rentals.types";
import { Dropdown } from "../Form/DropDown";
import { useEffect, useState } from "react";
import { formatDateHTML } from "../../utils/formateDate";
import { equipmentApi, userApi } from "../../api";
import FormModal from "../Form/FormModal";

interface EditRentalModalProps {
  rental: RentalData;
  onClose: () => void;
  onSave: (updatedData: RentalData) => void;
}

interface DropdownOption {
  value: number | string;
  label: string;
}

export function EditRentalModal({
  rental,
  onClose,
  onSave,
}: EditRentalModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RentalData>({
    resolver: zodResolver(rentalSchema),

    defaultValues: {
      id: rental.id,
      quantity: rental.quantity,
      user: rental.user.user_id,
      equipment: rental.equipment.e_id,
      start_date: formatDateHTML(rental.start_date),
      end_date: formatDateHTML(rental.end_date),
      payment_status: rental.payment_status,
    },
  });

  useEffect(() => {
    reset({
      id: rental.id,
      quantity: rental.quantity,
      start_date: formatDateHTML(rental.start_date),
      end_date: formatDateHTML(rental.end_date),
      payment_status: rental.payment_status,
    });
  }, [rental, reset]);

  const [userData, setUserData] = useState<DropdownOption[]>([]);
  const [equipData, setEquipData] = useState<DropdownOption[]>([]);

  const fetchData = async () => {
    try {
      const allUserData = await userApi.getAll();
      const allEquipmentData = await equipmentApi.getAll();

      const mappedUserData: DropdownOption[] = allUserData.data.map((data) => ({
        value: data.user_id,
        label: data.name,
      }));

      const mappedEquipData: DropdownOption[] = allEquipmentData.data.map(
        (data) => ({
          value: data.e_id,
          label: data.name,
        })
      );

      setUserData(mappedUserData);
      setEquipData(mappedEquipData);
    } catch (e) {
      console.error("Error fetching data:", e);
      alert("Failed to load user or equipment data. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
    //   <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
    <>
      <FormModal>
        <h2 className="text-xl font-bold mb-4">Edit Rental</h2>
        <form onSubmit={handleSubmit(onSave)}>
          <div className="mb-4">
            <Dropdown
              labelText="Customer"
              labelFor="user"
              name="user"
              register={register}
              valueAsNumber={true}
              options={userData}
              placeholder="Select a customer"
              error={errors["user"]}
            />

            <Dropdown
              labelText="Equipment"
              labelFor="equipment"
              name="equipment"
              register={register}
              valueAsNumber={true}
              options={equipData}
              placeholder="Select equipment"
              error={errors["equipment"]}
            />

            <Input
              labelText=""
              labelFor="id"
              name="id"
              type="hidden"
              register={register}
              error={errors.id}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                labelText="Quantity"
                labelFor="quantity"
                name="quantity"
                type="number"
                valueAsNumber={true}
                placeholder="e.g., 1 or 5"
                register={register}
                error={errors.quantity}
              />

              <Input
                labelText="Start Date"
                labelFor="start_date"
                name="start_date"
                type="date"
                placeholder=""
                register={register}
                error={errors.start_date}
              />

              <Input
                labelText="End Date"
                labelFor="end_date"
                name="end_date"
                type="date"
                placeholder=""
                register={register}
                error={errors.end_date}
              />

              <Dropdown
                labelText="Payment Status"
                labelFor="payment_status"
                name="payment_status"
                register={register}
                options={[
                  { value: "unpaid", label: "Unpaid" },
                  { value: "paid", label: "Paid" },
                  { value: "pending", label: "Pending" },
                ]}
                placeholder="Select payment status"
                error={errors.payment_status}
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </FormModal>
    </>

    //   </div>
    // </div>
  );
}
