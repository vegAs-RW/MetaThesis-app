import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/"); 
      }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="max-w-lg text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">
          Oops! The page you were looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <button
          onClick={handleGoBack}
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;

