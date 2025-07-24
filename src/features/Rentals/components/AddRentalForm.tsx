import { useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rentalSchema, type RentalData } from "../../../types/rentals.types";
import { Dropdown } from "../../../components/Form/DropDown";
import { Input } from "../../../components/Form/Input";
import FormAction from "../../../components/Form/FormAction";
import { useGetDropDownData } from "../hooks/useGetDropDownData";
import { useCreateRental } from "../hooks/useCreateRental";

interface DropdownOption {
  value: number | string;
  label: string;
}

function AddRentalForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RentalData>({
    resolver: zodResolver(rentalSchema),
  });

  const [UserData, setUserData] = useState<DropdownOption[]>([]);
  const [equipData, setEquipData] = useState<DropdownOption[]>([]);

  const createMutation = useCreateRental();

  const onsubmit = async (data: RentalData) => {
    createMutation.mutate(data);
  };

  useGetDropDownData(setUserData, setEquipData);

  return (
    <div className="w-full max-w-2xl transform overflow-x-auto rounded-xl bg-white p-6 shadow-2xl hover:shadow-3xl border border-gray-200">
      <form className="" onSubmit={handleSubmit(onsubmit)}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Dropdown
            labelText="Customer"
            labelFor="user"
            name="user"
            register={register}
            valueAsNumber={true}
            options={UserData}
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
            labelText="Quantity"
            labelFor="quantity"
            name="quantity"
            type="number"
            valueAsNumber={true}
            placeholder="e.g., 1 or 5"
            register={register}
            error={errors["quantity"]}
          />

          <Input
            labelText="Start Date"
            labelFor="start_date"
            name="start_date"
            type="date"
            placeholder=""
            register={register}
            error={errors["start_date"]}
          />

          <Input
            labelText="End Date"
            labelFor="end_date"
            name="end_date"
            type="date"
            placeholder=""
            register={register}
            error={errors["end_date"]}
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
            error={errors["payment_status"]}
          />
        </div>

        <FormAction text="Add Rental" />
      </form>
    </div>
  );
}

export default AddRentalForm;
