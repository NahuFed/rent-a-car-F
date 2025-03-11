import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
    element: React.ReactNode;
    requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, requiredRole }) => {
    const { isAuthenticated, role, loading } = useAuth();

    if (loading) {
        return <div className='loading-spinner'></div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/login" />;
    }

    return <>{element}</>;
};

export default PrivateRoute;