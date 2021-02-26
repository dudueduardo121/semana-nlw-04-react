import CompletedChallenges from '../components/CompletedChallenges'
import Countdown from '../components/Countdown'
import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile'
import styles from '../styles/pages/Home.module.css'
import { GetServerSideProps} from 'next'
import Head from 'next/head'
import ChallengeBox from '../components/ChallengeBox'
import { CountdownProvider } from '../contexts/CountdownContext'
import { Challengesprovider } from '../contexts/ChallengeContext'

interface Homeprops {
  level: number;
  currenteExperience: number;
  challengeCompleted: number;
}

export default function Home(props: Homeprops) {

  return (
    <Challengesprovider level={props.level} currenteExperience={props.currenteExperience} challengeCompleted={props.challengeCompleted}>
      <div className={styles.container}>
        <Head>
          <title>Inicio | moveit-next</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallenges/>
              <Countdown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </Challengesprovider>
  )
}

/* função para manipular quais dados serão passados do Back para o Front storage cookies */
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currenteExperience, challengeCompleted} = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currenteExperience: Number(currenteExperience),
      challengeCompleted: Number(challengeCompleted)
    }
  }
}
