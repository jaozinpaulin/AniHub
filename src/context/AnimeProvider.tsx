import { useEffect, useState, createContext, type ReactNode } from "react";
import { getAnimes } from "../services/animes";
import { useAnimes } from "../hooks/useAnimes";

import type { AnimeType } from "../types/anime";
import type { QueryDocumentSnapshot } from "firebase/firestore";


interface AnimeContextType {
    animes: AnimeType[];
    loading: boolean;
    error: string | null;
    loadAnimes: () => Promise<void>;
}

interface AnimeProviderProps {
    children: ReactNode;
}


export const AnimeContext = createContext<AnimeContextType | null>(null);


export function AnimeProvider({ children }: AnimeProviderProps) {

    const [animes, setAnimes] = useState<AnimeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);

    const loadAnimes = async () => {

        try {
            // throw new Error("Erro de teste")
            setLoading(true);
            setError(null);
            const data = await getAnimes();

            setAnimes(data.animes);
            setLastVisible(data.lastVisible)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }


        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAnimes();
    }, [])

    return (
        <AnimeContext.Provider value={{ animes, loading, error, loadAnimes }}>
            {children}
        </AnimeContext.Provider>
    )
}