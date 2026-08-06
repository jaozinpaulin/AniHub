import FavoritesProvider from "./FavoritesProvider";
import TimerProvider from "./TimerProvider";

import AuthProvider from "./AuthProvider.jsx"
import { ToastProvider } from "./ToastProvider";

import { AnimeProvider } from "./AnimeProvider";


export default function AppProvider({ children }) {
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