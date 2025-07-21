import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { equipmentApi, rentalApi, userApi } from "../../api";
import { rentalSchema, type RentalData } from "../../types/rentals.types";
import { Dropdown } from "../Form/DropDown";
import { Input } from "../Form/Input";
import FormAction from "../Form/FormAction";
import { useNavigate } from "react-router-dom";
import { Flip, toast } from "react-toastify";

interface DropdownOption {
  value: number | string;
  label: string;
}

function AddRentalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RentalData>({
    resolver: zodResolver(rentalSchema),
  });

  const [userData, setUserData] = useState<DropdownOption[]>([]);
  const [equipData, setEquipData] = useState<DropdownOption[]>([]);

  const navigate = useNavigate();

  const onsubmit = async (data: RentalData) => {
    console.log("Form data submitted:", data);
    try {
      const response = await rentalApi.post(data);

      toast.success(`Successfully Rental created !`, {
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
      navigate("/rentals");
    } catch (e) {
      console.error("Error fetching data:", e);
      alert("Failed to post rental data. Please try again.");
    }
  };

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
    <div className="w-full max-w-2xl transform overflow-x-auto rounded-xl bg-white p-6 shadow-2xl hover:shadow-3xl border border-gray-200">
      <form className="" onSubmit={handleSubmit(onsubmit)}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
