import { useState, createContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

import { addFavorite, getFavorites, removeFavorite } from "../services/favorites";

export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {

    const { user, loading } = useAuth();
    const { showToast } = useToast();

    const [favoritos, setFavoritos] = useState([]);
    const [favoritesLoading, setFavoritesLoading] = useState(false);
    const [error, setError] = useState(null);

    async function loadFavorites() {
        try {
            setFavoritesLoading(true);
            setError(null);

            const favorites = await getFavorites(user.uid);
            setFavoritos(favorites);

        } catch (error) {
            setError(error.message);
            showToast(
                "Não foi possível carregar seus favoritos.",
                "error"
            );
        } finally {
            setFavoritesLoading(false);
        }
    }

    useEffect(() => {
        if (loading) return;

        if (!user) {
            setFavoritos([]);
            setFavoritesLoading(false);
            setError(null);
            return;
        }

        loadFavorites();
    }, [user, loading]);

    function isFavorite(id) {
        return favoritos.some(
            anime => anime.id_video === id
        );
    }

    async function toggleFavorite(anime) {
        if (!user) {
            showToast(
                "Faça login para salvar seus favoritos",
                "warning"
            );
            return;
        }

        try {
            if (isFavorite(anime.id_video)) {
                await removeFavorite(user.uid, anime.id_video);

                showToast(
                    "Favorito removido!",
                    "info"
                );
            } else {
                await addFavorite(user.uid, anime);

                showToast(
                    "Favorito salvo!",
                    "success"
                );
            }

            await loadFavorites();
        } catch (error) {
            setError(error.message);
            showToast(
                "Não foi possível atualizar seus favoritos.",
                "error"
            );
        }
    }

    return (
        <FavoritesContext.Provider
            value={{
                favoritos,
                favoritesLoading,
                error,
                user,
                loadFavorites,
                isFavorite,
                toggleFavorite
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}