import { createContext, useState, ReactNode, useEffect} from 'react'
import challenges from '../../challenges.json'

interface challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;

}

interface challengesContextData{
    level: number;
    currenteExperience: number;
    experienceToNextLevel: number
    challengeCompleted: number;
    activeChallenge: challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengeProviderProps {
    children: ReactNode;
}

export const challengeContext = createContext({} as challengesContextData);

export function Challengesprovider ({ children}: ChallengeProviderProps) {

    const [level, setLevel] = useState(1);
    const [currenteExperience, setCurrenteExperience] = useState(0);
    const [challengeCompleted, setChallengeCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4,2);

    /* useEffect passando array vazio será executado uma unica vez */
    useEffect(() => {
        Notification.requestPermission();
    }, [])

    const levelUp = () => {
        setLevel(level + 1);
    }

    const startNewChallenge = () => {
        const randomChallengeindex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeindex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();
        
        if(Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} XP!`
            })
        }
    }

    const resetChallenge = () => {
        setActiveChallenge(null);
    }

    const completeChallenge = () => {
        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currenteExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrenteExperience(finalExperience);
        setActiveChallenge(null);
        setChallengeCompleted(challengeCompleted + 1);
    }

    return (
        <challengeContext.Provider 
        value={{ 
            level, 
            currenteExperience, 
            challengeCompleted, 
            activeChallenge,experienceToNextLevel, 
            levelUp, 
            startNewChallenge, 
            resetChallenge,
            completeChallenge
            }}>
        {children}
        </challengeContext.Provider>  
    )
}