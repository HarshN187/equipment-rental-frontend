import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaShippingFast,
  FaTools,
  FaUsers,
} from "react-icons/fa";
import { equipmentApi, rentalApi, userApi } from "../../../api";
import StatisticsBox from "./StatisticsBox";

function Statistics() {
  const [userCount, setUserCount] = useState(0);
  const [equipmentCt, setEquipCt] = useState(0);
  const [avaiEquipmentCt, setavaiEquipCt] = useState(0);
  const [activeRental, setActiveRental] = useState(0);

  async function getCount() {
    const user = await userApi.getAll();

    const equipment = await equipmentApi.getAll();

    const availableEquipment = await equipmentApi.getAll({ available: 1 });

    const rentals = await rentalApi.getAll();

    setUserCount(user.data.length);
    setEquipCt(equipment.data.length);
    setActiveRental(rentals.data.length);
    setavaiEquipCt(availableEquipment.data.length);
  }

  useEffect(() => {
    getCount();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatisticsBox
        iconcolor="bg-blue-600"
        title="Total Users"
        number={userCount}
      >
        <FaUsers className="text-3xl" />
      </StatisticsBox>

      <StatisticsBox
        iconcolor="bg-orange-500"
        title="Total Equipments"
        number={equipmentCt}
      >
        <FaTools className="text-3xl" />
      </StatisticsBox>

      <StatisticsBox
        iconcolor="bg-green-500"
        title="Active Rentals"
        number={activeRental}
      >
        <FaShippingFast className="text-3xl" />
      </StatisticsBox>

      <StatisticsBox
        iconcolor="bg-purple-500"
        title="Available Equipments"
        number={avaiEquipmentCt}
      >
        <FaCalendarAlt className="text-3xl" />
      </StatisticsBox>
    </div>
  );
}

export default Statistics;
