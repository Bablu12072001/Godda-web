import React from "react";
import { useNavigate } from "react-router-dom";
export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, the page you are looking for might be under construction or
            does not exist.
          </p>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Go Home
          </button>
          {/* You can add additional content, styling, or links here */}
        </div>
      </div>
    </div>
  );
}
