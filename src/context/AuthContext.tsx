import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { URI_GET_USER_BY_EMAIL } from '../constants/endpoints-API';

interface AuthContextProps {
    isAuthenticated: boolean;
    role: string | null;
    loading: boolean;
    userId: string | null;
    login: (role: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface DecodedToken {
    username: string;    
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    role: null,
    loading: true,
    userId: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<string | null>(null);

    const fetchUserId = async (email: string) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(URI_GET_USER_BY_EMAIL(email),{
                headers: { Authorization: `Bearer ${token}` },
            });                
            setUserId(response.data.id);
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');       

        setTimeout(() => {
            if (token && userRole) {
                const decodedToken: DecodedToken = jwtDecode(token);              
                setIsAuthenticated(true);
                setRole(userRole);
                fetchUserId(decodedToken.username);
            }
            setLoading(false);
        }, 300);
    }, [isAuthenticated]);

    const login = (userRole: string) => {
        setIsAuthenticated(true);
        setRole(userRole);
        
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setRole(null);
        setUserId(null);
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, loading, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
