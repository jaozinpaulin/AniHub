import { createContext, useEffect, useState, type ReactNode } from "react";

import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout, register } from "../services/auth";


import type { User } from "firebase/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    handleLogin: (email: string, password: string) => Promise<void>;
    handleRegister: (email: string, password: string) => Promise<void>;
    handleLogout: () => Promise<void>;
}

interface AuthContextProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthContextProps) {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async (email: string, password: string): Promise<void> => {
        await login(email, password)
    }
    const handleRegister = async (email: string, password: string): Promise<void> => {
        await register(email, password)
    }
    const handleLogout = async (): Promise<void> => {
        await logout()
    }

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}