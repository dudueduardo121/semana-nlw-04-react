import { createContext, useState, ReactNode, useEffect} from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import LevelUpModal from '../components/LevelUpModal';

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
    closeLevelUpModal: () => void;
}

interface ChallengeProviderProps {
    children: ReactNode;
    level: number;
    currenteExperience: number;
    challengeCompleted: number;
}

export const challengeContext = createContext({} as challengesContextData);

export function Challengesprovider ({ children, ...rest}: ChallengeProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currenteExperience, setCurrenteExperience] = useState(rest.currenteExperience ?? 0);
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModal, setisLevelUpModal] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4,2);

    /* useEffect passando array vazio será executado uma unica vez */
    useEffect(() => {
        Notification.requestPermission();
    }, []);

    /* Local storage cookis installar biblioteca yarn add js-cookie e @types/js-cookie -D*/
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currenteExperience', String(currenteExperience));
        Cookies.set('challengeCompleted', String(challengeCompleted));
    }, [level, currenteExperience, challengeCompleted]);


    const levelUp = () => {
        setLevel(level + 1);
        setisLevelUpModal(true);
        new Audio('/aee.mp3').play();
    }

    const closeLevelUpModal = () => {
        setisLevelUpModal(false);
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
            completeChallenge,
            closeLevelUpModal
            }}>
        {children}

        {isLevelUpModal &&
            <LevelUpModal/>
        }

        </challengeContext.Provider>  
    )
}