import { useState, createContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

import { addFavorite, getFavorites, removeFavorite } from "../services/favorites";

export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {

    const { user } = useAuth();
    const { showToast } = useToast();

    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function loadFavorites() {
        try {
            // throw new Error("Errp de teste")
            setLoading(true);
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
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!user) {
            setFavoritos([]);
            return;
        }
        loadFavorites();
    }, [user]);

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
            value={{ favoritos, loading, error, loadFavorites, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );

}