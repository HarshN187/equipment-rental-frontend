import type { JSX } from "react";
import { EquipmentTable } from "../../components";

function EquipmentPage(): JSX.Element {
  return (
    <>
      <div className="container mx-auto p-6 ">
        {/* Fixed header for User List */}
        <h1 className="text-3xl font-semibold mb-6 sticky top-24 bg-white z-10 border-b-2 border-gray-200">
          Equipment List
        </h1>

        <EquipmentTable></EquipmentTable>
      </div>
    </>
  );
}

export default EquipmentPage;
