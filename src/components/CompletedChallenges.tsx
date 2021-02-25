import { useContext } from 'react'
import { challengeContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export default function CompletedChallenges() {

    const { challengeCompleted} = useContext(challengeContext)

    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengeCompleted}</span>
        </div>
    )
}
