import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesProvider";

export function useFavorites() {
    return useContext(FavoritesContext);

}