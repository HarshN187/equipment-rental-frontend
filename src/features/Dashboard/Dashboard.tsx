import type React from "react";
import Statistics from "./components/Statistics";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="max-w-auto mx-auto px-4  mt-8">
        <Statistics></Statistics>

        {/* Quick Actions Section */}
        {/* <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-lg p-6 flex justify-center items-center cursor-pointer hover:bg-gray-200">
            <button className="text-orange-600 font-semibold text-xl">
              Add New User
            </button>
          </div>
          <div className="bg-white shadow rounded-lg p-6 flex justify-center items-center cursor-pointer hover:bg-gray-200">
            <button className="text-orange-600 font-semibold text-xl">
              Add New Equipment
            </button>
          </div>
          <div className="bg-white shadow rounded-lg p-6 flex justify-center items-center cursor-pointer hover:bg-gray-200">
            <button className="text-orange-600 font-semibold text-xl">
              Create Rental
            </button>
          </div>
          <div className="bg-white shadow rounded-lg p-6 flex justify-center items-center cursor-pointer hover:bg-gray-200">
            <button className="text-orange-600 font-semibold text-xl">
              View Rentals
            </button>
          </div>
        </div> */}

        {/* <RecentActivity></RecentActivity> */}
      </div>
    </>
  );
};

export default Dashboard;
