import type { JSX } from "react";
import {
  equipmentSchema,
  type EquipmentData,
} from "../../types/equipment.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditEquipModalProps {
  rental: EquipmentData;
  onClose: () => void;
  onSave: (updatedData: EquipmentData) => void;
}

function EditEquipmentModal({
  rental,
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

    // defaultValues: {
    //   id: rental.id,
    //   quantity: rental.quantity,
    //   user: rental.user.user_id,
    //   equipment: rental.equipment.e_id,
    //   start_date: formatDateHTML(rental.start_date),
    //   end_date: formatDateHTML(rental.end_date),
    //   payment_status: rental.payment_status,
    // },
  });
  return <div>EditEquipmentModal</div>;
}

export default EditEquipmentModal;
