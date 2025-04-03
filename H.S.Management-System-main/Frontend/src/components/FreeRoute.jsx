import React from 'react';
import { Navigate } from 'react-router-dom';

const FreeRoute = ({ children }) => {
    const user = localStorage.getItem('role');

    if (!user) {
        return children; // Allow access if no user is logged in
    }

    return user === "User" ? <Navigate to="/" /> : <Navigate to="/myHospitals" />;
};

export default FreeRoute;
