import React from 'react';
import format from 'date-fns/format';
import { instanceOf } from "prop-types";
import { Grid, Typography } from "@material-ui/core";

// Other resources
import { TIME_FORMAT } from "../constants/general";

GameResultsComponent.propTypes = {
  results: instanceOf(Array).isRequired,
};

export default function GameResultsComponent(props) {
  const { results } = props;

  return (
    <Grid container spacing={1}>
      <Grid item container xs={12}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" align="center">
            <b>Date of the game</b>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" align="center">
            <b>Number of shots</b>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" align="center">
            <b>Duration</b>
          </Typography>
        </Grid>
      </Grid>
      {results?.map((result) => (
        <Grid item container key={result?._id} xs={12}>
          <Grid item xs={4}>
            <Typography variant="body2" align="center">
              {format(new Date(result?.createdAt || 0), TIME_FORMAT)}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" align="center">
              {result?.numberOfShots}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" align="center">
              {`${Math.floor(result?.duration)} seconds`}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
