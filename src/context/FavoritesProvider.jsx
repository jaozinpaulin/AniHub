import { useState, createContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

import { addFavorite, getFavorites, removeFavorite } from "../services/favorites";

export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {

    const { user } = useAuth()
    const { showToast } = useToast();

    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        if (!user) {
            setFavoritos([])
            return;
        }

        async function loadFavorites() {
            const favorites = await getFavorites(user.uid)
            setFavoritos(favorites)
        }
        loadFavorites()

    }, [user])

    const isFavorite = (id) => {
        return favoritos.some(ani => ani.id_video === id)
    }

    async function toggleFavorite(anime) {

        if (!user) {
            showToast(
                "Faça login para salvar seus favoritos",
                "warning"
            )
            return;
        }
        if (isFavorite(anime.id_video)) {
            await removeFavorite(user.uid, anime);
            showToast(
                "Favorito removido!",
                "info"
            )
        } else {
            await addFavorite(user.uid, anime);
            showToast(
                "Favorito salvo!",
                "success"
            )
        }
        const favorites = await getFavorites(user.uid)
        setFavoritos(favorites);

    }

    return (
        <FavoritesContext.Provider value={{ favoritos, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}



