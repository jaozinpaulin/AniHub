import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesProvider";

export function useFavorites() {

    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error(
            "useAuth deve ser usado dentro do FavoritesContext"
        );
    }

    return context;
}