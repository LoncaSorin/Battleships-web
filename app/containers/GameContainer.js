import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box, Button, Grid, Typography,
} from "@material-ui/core";

// Components
import GameDotComponent from "../components/GameDotComponent";
import GameResultsComponent from "../components/GameResultsComponent";
import UnauthorizedScreenComponent from "../components/UnauthorizedScreenComponent";

// Actions
import {getGames, saveGame} from "../service/GamesService";

// Other resources
import { LANDING_PAGE } from "../constants/clientRoutes";
import { checkValidMapSize, generateMap } from "../utils/gameUtils";

export default function GameContainer() {
  const router = useRouter();
  const { rowSize } = router.query;
  const [map, setMap] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const classes = useStyles();
  const [strikes, setStrikes] = useState(0);
  const [results, setResults] = useState([]);
  const [gameStartedAt, setGameStartedAt] = useState();

  useEffect(() => {
    fetchGames();
    setGameStartedAt(new Date().getTime());
  }, []);

  const fetchGames = async() => {
    const response = await getGames();

    response.sort((firstOption, secondOption) => {
      if (firstOption?.numberOfShots < secondOption?.numberOfShots) {
        return 1;
      }

      return firstOption?.numberOfShots > secondOption?.numberOfShots ? -1 : 0;
    });

    setResults(response);
  }

  useEffect(() => {
    if (rowSize) {
      setMap(generateMap(rowSize));
    }
  }, [rowSize]);

  const handleClick = async (isShip) => {
    const duration = (new Date().getTime() - gameStartedAt) / 1000;
    setStrikes((prevState => prevState + 1));

    if (isShip) {
      const payload = {
        data: {
          numberOfShots: strikes + 1,
          duration,
        },
      };

      await saveGame(payload);
      fetchGames();

      setIsGameOver(true);
    }
  };

  const handleRedirect = () => {
    router.push(LANDING_PAGE);
  };

  return (
    <>
      {(checkValidMapSize(rowSize))
        ? (
          <Grid container spacing={1} className={classes.gridWrapper}>
            <Grid item xs={7}>
              {map?.map((row, indexRow) => (
                <Box
                  key={`${row}-${indexRow}`}
                  display="flex"
                  width="100%"
                  alignContent="center"
                  justifyContent="center"
                >
                  {row.map((isShip, indexColumn)=>(
                    <GameDotComponent
                      key={`${isShip}-${indexColumn}`}
                      rowSize={rowSize}
                      isShip={isShip}
                      handleClick={() => handleClick(isShip)}
                      isGameOver={isGameOver}
                    />
                  ))}
                </Box>
              ))}
            </Grid>
            <Grid item xs={5}>
              {results?.length > 0 && (
                <GameResultsComponent results={results} />
              )}
              {isGameOver && (
                <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                  <Button variant="contained" className={classes.redirectButton} onClick={handleRedirect}>
                    Play Again
                  </Button>
                  <Typography variant="h5">
                    {`Number of strikes: ${strikes}`}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        )
        : <UnauthorizedScreenComponent />
      }
    </>
  )
}

const useStyles = makeStyles(() => ({
  redirectButton: {
    color: "white",
    backgroundColor: "#00B2CA",
    marginTop: 16,
    marginBottom: 16,
    '&:hover': {
      backgroundColor: "#00B2CA",
    },
  },
  gridWrapper: {
    padding: 128,
  },
}));
