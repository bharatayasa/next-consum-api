"use client"
import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    userRole: string | null;
    setUserRole: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Cookies.get('token'));
    const [userRole, setUserRole] = useState<string | null>(
        Cookies.get('user') ? JSON.parse(Cookies.get('user') as string).role : null
    );

    useEffect(() => {
        const updateAuthStatus = () => {
            const token = Cookies.get('token');
            const user = Cookies.get('user');
            setIsAuthenticated(!!token);
            setUserRole(user ? JSON.parse(user as string).role : null);
        };

        updateAuthStatus();

        window.addEventListener('storage', updateAuthStatus);

        return () => {
            window.removeEventListener('storage', updateAuthStatus);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole }} >
            {children}
        </AuthContext.Provider>
    );
};
