import type { JSX } from "react";

function RecentActivity(): JSX.Element {
  return (
    <>
      {" "}
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Action</th>
                <th className="px-4 py-2 border-b">Customer</th>
                <th className="px-4 py-2 border-b">Equipment</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample data */}
              <tr>
                <td className="px-4 py-2 border-b">2023-07-15</td>
                <td className="px-4 py-2 border-b">Rental Created</td>
                <td className="px-4 py-2 border-b">John Doe</td>
                <td className="px-4 py-2 border-b">Camera</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">2023-07-14</td>
                <td className="px-4 py-2 border-b">User Added</td>
                <td className="px-4 py-2 border-b">Jane Smith</td>
                <td className="px-4 py-2 border-b">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RecentActivity;
