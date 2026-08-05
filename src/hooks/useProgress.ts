import { useContext } from 'react'
import { timerContext } from '../context/TimerProvider'

export function useProgress() {
    const context = useContext(timerContext);

    if (!context) {
        throw new Error("useProgress deve ser usado dentro do TimerProvider");
    }

    return context;
}