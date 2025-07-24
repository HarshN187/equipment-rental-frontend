import React, { type JSX } from "react";

type Props = {
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  totalPages: number;
};

function PaginationButton({
  perPage,
  setPerPage,
  setPage,
  pageNumber,
  totalPages,
}: Props): JSX.Element {
  return (
    <>
      <div className="flex justify-center my-4 items-center space-x-2">
        <select
          name="perPage"
          className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          id="perPage"
          value={perPage}
          onChange={(e) => {
            setPerPage(parseInt(e.target.value, 10));
            setPage(1);
          }}
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="25">25 per page</option>
        </select>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none transition-all duration-200"
          disabled={pageNumber === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <p className="px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 font-semibold shadow-sm min-w-[40px] text-center">
          {pageNumber}
        </p>
        <p className=" px-0.5 rounded-md bg-gray-50 text-gray-800 font-semibold shadow-sm text-center">
          of
        </p>
        <p className="px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 font-semibold shadow-sm min-w-[40px] text-center">
          {totalPages}
        </p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none transition-all duration-200"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={totalPages <= pageNumber}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PaginationButton;
