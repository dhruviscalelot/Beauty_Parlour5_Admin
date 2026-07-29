import React from 'react'
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {

    const location = useLocation();
    const token = localStorage.getItem("accessToken");
    return token ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );

    return (
        <Navigate to="/" replace />
    )
}

export default RequireAuth