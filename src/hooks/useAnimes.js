import { useEffect, useState } from "react";

import { getAnimes } from "../services/animes";

export function useAnimes() {

    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadAnimes() {
            try {
                const data = await getAnimes()
                setAnimes(data)

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false)
            }
        }

        loadAnimes();
    }, [])

    return {
        animes, loading, error
    }

}