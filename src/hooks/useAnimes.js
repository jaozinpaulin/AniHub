import { useContext } from "react";
import { AnimeContext } from "../context/AnimeProvider";

export function useAnimes() {

    const context = useContext(AnimeContext);

    if (!context) {
        throw new Error(
            "useAnimes deve ser usado dentro do AnimeProvider"
        );
    }

    return context;
}
