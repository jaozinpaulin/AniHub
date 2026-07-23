import { useState, createContext, useEffect } from "react";

import { useAuth } from "../hooks/useAuth";
import { saveProgress, getProgress } from "../services/progress";

export const timerContext = createContext();

export default function TimerProvider({ children }) {
    const { user } = useAuth();

    const [progressVideo, setProgressVideo] = useState([]);

    useEffect(() => {
        if (!user) {
            setProgressVideo([]);
            return;
        }

        async function loadProgress() {
            try {
                const progress = await getProgress(user.uid);
                setProgressVideo(progress);
            } catch (error) {
                console.error("Erro ao carregar progresso:", error);
            }
        }

        loadProgress();
    }, [user]);

    async function atualizarProgresso(dadosEp) {
        if (!user) return;

        try {
            const progressoAtual = progressVideo.find(item =>
                Number(item.animeId) === Number(dadosEp.animeId) &&
                Number(item.temporada) === Number(dadosEp.temporada) &&
                Number(item.episodio) === Number(dadosEp.episodio)
            );

            if (progressoAtual) {
                if (dadosEp.progress <= progressoAtual.progress) {
                    return;
                }
            }

            await saveProgress(user.uid, dadosEp);

            const progress = await getProgress(user.uid);
            setProgressVideo(progress);

        } catch (error) {
            console.error("Erro ao atualizar progresso:", error);
        }
    }
    return (
        <timerContext.Provider value={{ progressVideo, atualizarProgresso, }}>
            {children}
        </timerContext.Provider>
    );
}