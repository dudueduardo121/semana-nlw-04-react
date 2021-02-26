import { useContext } from 'react'
import { challengeContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/LevelUpModal.module.css'

export default function LevelUpModal() {

    const {level, closeLevelUpModal} = useContext(challengeContext)

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>

                <button onClick={closeLevelUpModal} type="button">
                    <img src="/icons/close.svg" alt=""/>
                </button>
            </div>
        </div>
    )
}
