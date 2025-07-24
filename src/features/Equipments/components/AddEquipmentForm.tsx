import { Dropdown } from "../../../components/Form/DropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormAction from "../../../components/Form/FormAction";
import { Input } from "../../../components/Form/Input";
import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { addEquipmentFields } from "../../../constants/formFields";
import {
  equipmentSchema,
  type EquipmentData,
} from "../../../types/equipment.types";
import { useGetCategoryDropDownData } from "../hooks/useGetCategory";
import { useAddEquipment } from "../hooks/useAddEquipment";

interface DropdownOption {
  value: number | string;
  label: string;
}

export function AddEquipmentForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EquipmentData>({
    resolver: zodResolver(equipmentSchema),
  });

  const [CategoryData, setCategoryData] = useState<DropdownOption[]>([]);

  const navigate = useNavigate();

  useGetCategoryDropDownData(setCategoryData);

  const addMutation = useAddEquipment();

  const onsubmit = async (data: EquipmentData) => {
    addMutation.mutate(data);
    navigate("/equipment");
  };

  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onsubmit)}>
        <div className="">
          {addEquipmentFields.map((ele, index) => (
            <Input
              key={index}
              labelText={ele.labelText}
              labelFor={ele.labelFor}
              name={ele.name}
              type={ele.type}
              placeholder={ele.placeholder}
              valueAsNumber={ele.valueAsNumber}
              register={register}
              error={errors[ele.name]}
            />
          ))}

          <Dropdown
            labelText="Category"
            labelFor="category"
            name="category"
            register={register}
            options={CategoryData}
            placeholder="select category"
            error={errors["category"]}
          ></Dropdown>

          <FormAction text="Add Equipment" />
        </div>
      </form>
    </div>
  );
}
