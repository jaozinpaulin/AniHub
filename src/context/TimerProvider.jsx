import { useState, createContext, useEffect } from "react";


export const timerContext = createContext()


export default function TimerProvider({ children }) {

    const [progressVideo, setProgressVideo] = useState(() => {
        const pro = localStorage.getItem('progress')
        return pro ? JSON.parse(pro) : {}
    })

    useEffect(() => {
        localStorage.setItem('progress', JSON.stringify(progressVideo))
    }, [progressVideo])

    const atualizarProgresso = (timer) => {
        // console.log(timer)
    }
    /* esse funtcion ja esta recebendo as infos agora e so fazer as logicas  */

    return (

        <timerContext.Provider value={{ progressVideo, atualizarProgresso }}>
            {children}
        </timerContext.Provider>

    )
}

