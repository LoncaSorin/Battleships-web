import React from 'react';
import Head from 'next/head';

// Components
import GameContainer from "../app/containers/GameContainer";

function Game() {

  return (
    <div>
      <Head>
        <title>Battleship - Game</title>
      </Head>
      <GameContainer />
    </div>
  );
}

export default Game;
