import { useEffect, useState } from "react";
import { equipmentApi, customerApi } from "../../../api";

interface DropdownOption {
  value: number | string;
  label: string;
}

export function useGetDropDownData(
  setUserData: React.Dispatch<React.SetStateAction<DropdownOption[]>>,
  setEquipData: React.Dispatch<React.SetStateAction<DropdownOption[]>>
) {
  const fetchData = async () => {
    try {
      const allUserData = await customerApi.getAll();
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
}
