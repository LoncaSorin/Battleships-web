import React, { useState } from 'react';
import { useRouter } from "next/router";
import { inRange } from "lodash/number";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Paper, TextField } from "@material-ui/core";

// Other resources
import { GET_GAME } from "../constants/clientRoutes";
import { MAXIMUM_ROW_SIZE, MINIMUM_ROW_SIZE } from "../constants/general";

export default function LandingPageContainer() {
  const [rowSize, setRowSize] = useState(5);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();
  const router = useRouter();

  const handleMapSize = (event) => {
    setRowSize(event.target.value)

    if (errorMessage) {
      setErrorMessage('');
    }
  }

  const handleCreateGame = () => {
    if (inRange(rowSize, MINIMUM_ROW_SIZE, MAXIMUM_ROW_SIZE)) {
      setErrorMessage('');
      return router.push(`${GET_GAME}?rowSize=${rowSize}`);
    }

    setErrorMessage(`Map size needs to be between ${MINIMUM_ROW_SIZE} and ${MAXIMUM_ROW_SIZE}`);
  };

  return (
    <Paper className={classes.paper}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column">
        <TextField
          id="rowSize"
          label="Row size"
          type="number"
          value={rowSize}
          onChange={handleMapSize}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errorMessage}
          helperText={errorMessage}
          className={classes.text}
        />
        <Button variant="contained" className={classes.createButton} onClick={handleCreateGame}>
          Create Game
        </Button>
      </Box>
    </Paper>
  );
}

const useStyles = makeStyles(() => ({
  paper: {
    height: '100vh',
  },
  createButton: {
    color: "white",
    backgroundColor: "#00B2CA",
    marginTop: 16,
    '&:hover': {
      backgroundColor: "#00B2CA",
    },
  },
  text: {
    paddingBottom: 20,
  },
}));

