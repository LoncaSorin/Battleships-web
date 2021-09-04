import React from 'react';
import { useRouter } from "next/router";
import Box from '@material-ui/core/Box';
import { Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Other resources
import { LANDING_PAGE } from "../constants/clientRoutes";

export default function UnauthorizedScreenComponent() {
  const classes = useStyles();
  const router = useRouter();

  const handleRedirect = () => {
    router.push(LANDING_PAGE);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <img src="/img_errors.svg" alt="Error" />
      <div>
        <Typography variant="h4" className={classes.titleMargin}>
          <b>Something went wrong…</b>
        </Typography>
        <Typography variant="h5">
          Error explanation: The game can't start without setting a correct map size.
        </Typography>
        <Button variant="contained" className={classes.homeButton} onClick={handleRedirect}>
          Home
        </Button>
      </div>
    </Box>
  );
}


const useStyles = makeStyles((theme) => ({
  titleMargin: {
    marginBottom: theme.spacing(2),
  },
  homeButton: {
    color: "white",
    backgroundColor: "#00B2CA",
    marginTop: 32,
    '&:hover': {
      backgroundColor: "#00B2CA",
    },
  },
}));
