import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("auth")));
    // const [isStudent, setIsStudent] = useState(true)

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.clear()
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
