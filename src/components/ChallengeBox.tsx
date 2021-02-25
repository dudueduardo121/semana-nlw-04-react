import { useContext } from 'react'
import { challengeContext } from '../contexts/ChallengeContext'
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {

    const { activeChallenge, resetChallenge, completeChallenge } = useContext(challengeContext);
    const { resetCount } = useContext(CountdownContext)

    //desafio completo
    const handleChallengeSucceded = () => {
        completeChallenge();
        resetCount();
    }

    //desafio não completado
    const handleChallengeFailed = () => {
        resetChallenge();
        resetCount();
    }
    
    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} XP</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button type="button" onClick={handleChallengeFailed} className={styles.challengefailsButton}>Falhei</button>
                        <button type="button" onClick={handleChallengeSucceded} className={styles.challengesuccesButton}>Completei</button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios
                    </p>
                </div>
            )}
        </div>
    )
}
