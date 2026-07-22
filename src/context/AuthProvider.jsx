import { createContext, useEffect, useState } from "react";

import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout, register } from "../services/auth";


export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async (email, password) => {
        return await login(email, password)
    }
    const handleRegister = async (email, password) => {
        return await register(email, password)
    }
    const handleLogout = async () => {
        return await logout()
    }

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}