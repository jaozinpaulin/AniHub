import FavoritesProvider from "./FavoritesProvider";
import TimerProvider from "./TimerProvider";
import AuthProvider from "./AuthProvider"

export default function AppProvider({ children }) {
    return (
        <AuthProvider>
            <FavoritesProvider>
                <TimerProvider>
                    {children}
                </TimerProvider>
            </FavoritesProvider>
        </AuthProvider>

    )
}