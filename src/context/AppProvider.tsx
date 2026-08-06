import type { ReactNode } from "react";

import FavoritesProvider from "./FavoritesProvider";
import TimerProvider from "./TimerProvider";

import AuthProvider from "./AuthProvider.js"
import { ToastProvider } from "./ToastProvider";

import { AnimeProvider } from "./AnimeProvider";

interface AppProviderProps {
    children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
    return (
        <AuthProvider>
            <ToastProvider>
                <AnimeProvider>
                    <FavoritesProvider>
                        <TimerProvider>
                            {children}
                        </TimerProvider>
                    </FavoritesProvider>
                </AnimeProvider>
            </ToastProvider>
        </AuthProvider>

    )
}