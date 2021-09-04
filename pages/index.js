import Head from 'next/head';

// Components
import LandingPageContainer from "../app/containers/LandingPageContainer";

export default function LandingPage() {

  return (
    <>
      <Head>
        <title>Battleships</title>
      </Head>
      <LandingPageContainer />
    </>
  )
}


