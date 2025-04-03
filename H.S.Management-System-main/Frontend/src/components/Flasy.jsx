import React from 'react'
import { Link } from 'react-router-dom';

const Flasy = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
            {/* Icon */}
            <div className="mb-8">
                <svg
                    className="w-24 h-24 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2 2 4 2 4m0 0c0 1.1.9 2 2 2s2-.9 2-2-2-4-2-4zm0 0h.01M12 4a8 8 0 100 16 8 8 0 000-16z"
                    />
                </svg>
            </div>

            {/* Message */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Unauthorized Access</h1>
            <p className="text-lg text-gray-600 text-center max-w-md mb-6">
                You don’t have permission to access this page. Please log in or sign up to continue.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/login"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 text-center"
                >
                    Log In
                </Link>
                <Link
                    to="/signup"
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-center"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Flasy