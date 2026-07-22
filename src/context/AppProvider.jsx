import FavoritesProvider from "./FavoritesProvider";
import TimerProvider from "./TimerProvider";
import AuthProvider from "./AuthProvider"
import { ToastProvider } from "./ToastProvider";

export default function AppProvider({ children }) {
    return (
        <AuthProvider>
            <ToastProvider>
                <FavoritesProvider>
                    <TimerProvider>
                        {children}
                    </TimerProvider>
                </FavoritesProvider>
            </ToastProvider>
        </AuthProvider>

    )
}