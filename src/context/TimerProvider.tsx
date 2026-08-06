import { useState, createContext, useEffect, type ReactNode } from "react";

import { useAuth } from "../hooks/useAuth";
import { saveProgress, getProgress } from "../services/progress";


interface TimerContextType {
    progressVideo: ProgressVideoType[];
    atualizarProgresso: (dadosEp: ProgressVideoType) => Promise<void>
}

interface TimerProviderProps {
    children: ReactNode;
}

export interface ProgressVideoType {
    animeId: string;
    temporada: number;
    episodio: number;
    progress: number;
}

export const timerContext = createContext<TimerContextType | null>(null);


export default function TimerProvider({ children }: TimerProviderProps) {
    const { user } = useAuth();

    const [progressVideo, setProgressVideo] = useState<ProgressVideoType[]>([]);

    useEffect(() => {
        if (!user) {
            setProgressVideo([]);
            return;
        }

        async function loadProgress() {
            if (!user) return;
            try {
                const progress = await getProgress(user.uid);
                setProgressVideo(progress);
            } catch (error) {
                console.error("Erro ao carregar progresso:", error);
            }
        }

        loadProgress();
    }, [user]);

    async function atualizarProgresso(dadosEp: ProgressVideoType) {
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