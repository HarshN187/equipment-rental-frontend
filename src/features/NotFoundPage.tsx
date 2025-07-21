import React from "react";
import { useNavigate } from "react-router-dom"; // Updated import

const NotFoundPage = () => {
  const navigate = useNavigate(); // useNavigate instead of useHistory

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mt-2">
          Sorry, the page you are looking for might have been moved or doesn't
          exist.
        </p>
        <button
          onClick={() => navigate(-1)} // Updated to use navigate()
          className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
