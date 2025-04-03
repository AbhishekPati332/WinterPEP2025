import React, { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios'
import { endPoints } from '../utils/endpoints';
import { Link, useNavigate } from 'react-router-dom';

const { SIGNUP_API } = endPoints;

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // console.log('Form submitted:', formData);

        try {

            const res = await axios.post(SIGNUP_API, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            if (!res.data.success) {
                toast.error(res.data.message);
            }
            // console.log(res.data);
            const { token, role } = res.data;
            const name = formData.name.split(" ")[0];
            localStorage.setItem("name", name);
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            toast.success(res.data.message);
            if (role === "Hospital_Admin") {
                navigate('/myHospitals')
            } else {
                navigate('/')
            }

        } catch (error) {
            toast.error(error);
        } finally {
            setIsLoading(false);
        }

        setFormData({
            name: '',
            email: '',
            password: '',
            role: ''
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-blue-600 text-center mb-2">
                    Hospital Management System
                </h2>
                <h3 className="text-xl text-gray-800 text-center mb-6">
                    Create Account
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="role" className="block text-gray-700 mb-2">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a role</option>
                            <option value="User">User</option>
                            <option value="Hospital_Admin">Hospital Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Logging in...
                            </>
                        ) : (
                            'Sign up'
                        )}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to='/login' className=' text-blue-600 hover:underline  ' >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;