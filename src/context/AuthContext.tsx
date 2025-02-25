import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    role: string | null;
    login: (role: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    role: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        if (token && userRole) {
            setIsAuthenticated(true);
            setRole(userRole);
        }
    }, []);

    const login = (userRole: string) => {
        setIsAuthenticated(true);
        setRole(userRole);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setRole(null);
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
    
};
export const useAuth = () => {
    return useContext(AuthContext);
};
