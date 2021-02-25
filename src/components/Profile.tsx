import { useContext } from 'react';
import { challengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css'

export default function Profile() {

  const { level } = useContext(challengeContext)

  return (
    <div className={styles.profileContainer}>
        <img src="http://carismartes.com.br/assets/global/images/avatars/avatar13_big.png" alt="Eduardo Gomes"/>
        <div>
            <strong>
                Eduardo Gomes
            </strong>
            <p>
                <img src="icons/level.svg" alt="level"/>
                Level {level}
            </p>
        </div>
    </div>
  );
}
