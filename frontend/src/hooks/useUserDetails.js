import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("user")) || {});

    const setUser = (userData) => {
        setUserDetails(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const clearUser = () => {
        setUserDetails({});
        localStorage.removeItem("user");
    };

    return (
        <UserContext.Provider value={{ userDetails, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};
