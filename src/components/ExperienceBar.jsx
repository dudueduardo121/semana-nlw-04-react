import React, { useContext } from 'react'
import { challengeContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/ExperienceBar.module.css'

export default function ExperienceBar() {

    const { currenteExperience, experienceToNextLevel } = useContext(challengeContext);

    const perecentTonextLevel = Math.round(currenteExperience * 100) / experienceToNextLevel;

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div >
                <div style={{width: `${perecentTonextLevel}%`}}></div>
                <span className={styles.currentExperience} style={{ left: `${perecentTonextLevel}%`}}>
                    {currenteExperience} XP
                </span>
            </div>
            <span>{experienceToNextLevel} XP</span>
        </header>
    )
}
