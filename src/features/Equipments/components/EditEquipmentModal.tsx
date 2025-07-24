import { useState, type JSX } from "react";
import {
  equipmentSchema,
  type EquipmentData,
} from "../../../types/equipment.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormModal from "../../../components/Form/FormModal";
import { Dropdown, Input } from "../../../components";
import { addEquipmentFields } from "../../../constants/formFields";
import { useGetCategoryDropDownData } from "../hooks/useGetCategory";
import ModelFormButtons from "../../../components/Form/ModelFormButtons";


interface EditEquipModalProps {
  equipment: EquipmentData & { category_id: number };
  onClose: () => void;
  onSave: any;
}

interface DropdownOption {
  value: number | string;
  label: string;
}

function EditEquipmentModal({
  equipment,
  onClose,
  onSave,
}: EditEquipModalProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EquipmentData>({
    resolver: zodResolver(equipmentSchema),

    defaultValues: {
      e_id: equipment.e_id,
      name: equipment.name,
      description: equipment.description,
      rent_per_day: equipment.rent_per_day,
      total_quntity: equipment.total_quntity,
      // category: equipment.category_id,
    },
  });
  console.log(equipment.category_id);
  const [CategoryData, setCategoryData] = useState<DropdownOption[]>([]);

  useGetCategoryDropDownData(setCategoryData);

  console.log(errors);
  return (
    <>
      <FormModal>
        <h2 className="text-xl font-bold mb-4">Edit Equipment</h2>
        <form onSubmit={handleSubmit(onSave)}>
          <div>
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
              defaultValue={equipment.category_id}
              register={register}
              options={CategoryData}
              placeholder="select category"
              error={errors["category"]}
            ></Dropdown>
          </div>

          <ModelFormButtons
            onClose={onClose}
            isSubmitting={isSubmitting}
          ></ModelFormButtons>
        </form>
      </FormModal>
    </>
  );
}

export default EditEquipmentModal;
