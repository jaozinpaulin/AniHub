import { useEffect, useState, createContext } from "react";
import { getAnimes } from "../services/animes";
import { useAnimes } from "../hooks/useAnimes";


export const AnimeContext = createContext();


export function AnimeProvider({ children }) {

    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastVisible, setLastVisible] = useState(null);

    const loadAnimes = async () => {

        try {
            // throw new Error("Erro de teste")
            setLoading(true);
            setError(null);
            const data = await getAnimes();

            setAnimes(data.animes);
            setLastVisible(data.lastVisible)
        } catch (error) {
            setError(error.message);

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