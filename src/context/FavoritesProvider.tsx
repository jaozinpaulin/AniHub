import { useState, createContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";


import { addFavorite, getFavorites, removeFavorite } from "../services/favorites";

import type { AnimeType } from "../types/anime";
import type { User } from "firebase/auth";
import type { ReactNode } from "react";

interface FavoritesContextType {
    favoritos: AnimeType[];
    favoritesLoading: boolean;
    error: string | null;
    user: User | null;
    loadFavorites: () => Promise<void>;
    isFavorite: (animeId: string) => boolean;
    toggleFavorite: (anime: AnimeType) => Promise<void>;
}

interface FavoritesProviderProps {
    children: ReactNode;
}


export const FavoritesContext = createContext<FavoritesContextType | null>(null);

export default function FavoritesProvider({ children }: FavoritesProviderProps) {

    const { user, loading } = useAuth();
    const { showToast } = useToast();

    const [favoritos, setFavoritos] = useState<AnimeType[]>([]);
    const [favoritesLoading, setFavoritesLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function loadFavorites() {
        try {
            setFavoritesLoading(true);
            setError(null);

            const favorites = await getFavorites(user.uid);
            setFavoritos(favorites);

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Erro desconhecido");
            }

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

    function isFavorite(id: string) {
        return favoritos.some(
            anime => anime.id_video === id
        );
    }

    async function toggleFavorite(anime: AnimeType) {
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

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Erro desconhecido");
            }

            showToast(
                "Não foi possível atualizar seus favoritos.",
                "error"
            );
        }
    }

    interface FavoritesContextType {

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