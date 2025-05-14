import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        navigate("/private");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
    };

    const checkTokenValidity = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (resp.ok) {
                setIsAuthenticated(true);
            } else {
                logout();
            }
        } catch (err) {
            logout();
        }
    };

    useEffect(() => {
        checkTokenValidity();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
