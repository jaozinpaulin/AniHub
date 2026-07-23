import { useContext } from 'react'
import { timerContext } from '../context/TimerProvider'

export function useProgress() {
    return useContext(timerContext)
}