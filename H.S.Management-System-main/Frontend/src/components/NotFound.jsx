import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-2">Oops! Page not found.</p>
      <Link to={localStorage.getItem("role")==="Hospital_Admin" ? '/myHospitals' : '/'} className="mt-4 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
