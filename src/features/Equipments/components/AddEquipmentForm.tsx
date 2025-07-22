import { Dropdown } from "../../../components/Form/DropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormAction from "../../../components/Form/FormAction";
import { Input } from "../../../components/Form/Input";
import { equipmentApi } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEquipmentFields } from "../../../constants/formFields";
import {
  equipmentSchema,
  type EquipmentData,
} from "../../../types/equipment.types";

export function AddEquipmentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<EquipmentData>({
    resolver: zodResolver(equipmentSchema),
  });

  const [CategoryData, setCategoryData] = useState<
    {
      value: number | string;
      label: string;
    }[]
  >();

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await equipmentApi.getCategory();
      console.log(response.data);

      const data = response.data.map((data) => {
        return {
          value: data.category_id,
          label: data.name,
        };
      });

      console.log(data);

      setCategoryData(data);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onsubmit = async (data: EquipmentData) => {
    console.log(data);
    try {
      const response = await equipmentApi.post(data);
      console.log(response);
      navigate("/equipment");
    } catch (e) {
      alert(e);
      console.log(e);
    }
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
