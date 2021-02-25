import { useState, useEffect, useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

export default function Countdown() {

    const { minutos, segundos, hasFinish, active, resetCount, startCount } = useContext(CountdownContext)

    const [minuteleft, minuteRight] = String(minutos).padStart(2, '0').split('');
    const [secondleft, secondRight] = String(segundos).padStart(2, '0').split('');

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteleft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondleft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinish ? (
                <button disabled className={styles.startCountdownButton}>
                    Ciclo encerrado
                    <img src="icons/check_circle.svg" alt=""/>
                </button>
            ) : (
                    <>
                        {active ? (
                            <button onClick={resetCount} type="button" className={`${styles.startCountdownButton} ${styles.startCountdownButtonActive}`}>
                                Abandonar ciclo
                            </button>
                        ) : (
                                <button onClick={startCount} type="button" className={styles.startCountdownButton}>
                                    Iniciar um ciclo
                                </button>
                            )}
                    </>
                )}


        </div>
    )
}
