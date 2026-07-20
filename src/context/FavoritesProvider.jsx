import { useState, createContext, useEffect } from "react";

export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {


    const [favoritos, setFavoritos] = useState(() => {
        const favo = localStorage.getItem('favoritos')
        return favo ? JSON.parse(favo) : [];
    })

    useEffect(() => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos))
    }, [favoritos])



    const addFavorite = (anime) => {
        setFavoritos(prev => {
            if (prev.some(a => a.id_video === anime.id_video)) {
                return prev
            }
            return [...prev, anime]
        });
    };

    const toggleFavorite = (anime) => {
        setFavoritos(prev => {
            if (prev.some(a => a.id_video === anime.id_video)) {

                return prev.filter(ani => ani.id_video !== anime.id_video)
            }
            return [...prev, anime]
        })
    }

    const isFavorite = (id) => {
        return favoritos.some(ani => ani.id_video === id)
    }

    return (
        <FavoritesContext.Provider value={{ favoritos, addFavorite, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}



