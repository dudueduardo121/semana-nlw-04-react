/* Estrutura basica Contexto react */

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { challengeContext } from "./ChallengeContext";

interface CountdownContextData {
    minutos: number;
    segundos: number;
    hasFinish: boolean;
    active: boolean;
    startCount: () => void;
    resetCount: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;/* varialvel global javscript */

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({children} : CountdownProviderProps) {

    const { startNewChallenge } = useContext(challengeContext)

    const [time, setTime] = useState(25 * 60);
    const [active, setActive] = useState(false);
    const [hasFinish, setHasfinish] = useState(false)

    const minutos = Math.floor(time / 60);
    const segundos = time % 60;

    useEffect(() => {
        if (active && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (active && time === 0) {
            setHasfinish(true);
            setActive(false);
            startNewChallenge();
        }
    }, [active, time])

    const startCount = () => {
        setActive(true);
    }

    const resetCount = () => {
        clearTimeout(countdownTimeout);
        setActive(false);
        setTime(25 * 60);
        setHasfinish(false);
    }


    return(
        <CountdownContext.Provider value={{
            minutos,
            segundos,
            hasFinish,
            active,
            startCount,
            resetCount,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}