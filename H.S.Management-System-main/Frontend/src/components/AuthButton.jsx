import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import React, { useState, useEffect } from 'react';

const AuthButton = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Check for token when component mounts
    useEffect(() => {
        const token = localStorage.getItem('token'); // Assuming 'token' is your key
        setIsAuthenticated(!!token); // Convert to boolean
    }, []);

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        toast.success("Logout successfully.")
        navigate('/'); // Redirect to home page after logout
        window.location.reload();
    };

    return (
        <div className=''>
            {isAuthenticated ? (
                <div className=' flex items-center justify-center gap-[10px] ' >
                    <div className=' w-[70px] h-[70px] flex items-center rounded-full bg-gray-700 text-white justify-center '  >
                       <img src="https://avatar.iran.liara.run/public" alt="Avatar" />
                    </div>
                    <div className=' pt-[0.75rem] cursor-pointer pb-[0.75rem] pl-[2rem] pr-[2rem] text-white rounded-3xl flex items-center justify-center bg-blue-500 text-sm  ' >
                        <button
                            onClick={handleLogout}
                            className="w-full h-full cursor-pointer "
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <Link to='/signup' className=' pt-[0.75rem] pb-[0.75rem] pl-[2rem] pr-[2rem] text-white rounded-3xl flex items-center justify-center cursor-pointer bg-blue-500 text-sm '>
                    Create Account
                </Link>
            )}
        </div>
    );
};

export default AuthButton;