import FavoritesProvider from "./FavoritesProvider";
import TimerProvider from "./TimerProvider";

export default function AppProvider({ children }) {
    return (
        <FavoritesProvider>
            <TimerProvider>
                {children}
            </TimerProvider>
        </FavoritesProvider>

    )
}