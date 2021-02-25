import '../styles/global.css'

import { Challengesprovider } from '../contexts/ChallengeContext'

function MyApp({ Component, pageProps }) {

  return (
    <Challengesprovider>
      <Component {...pageProps} />
    </Challengesprovider>  
  ) 
  }

export default MyApp
