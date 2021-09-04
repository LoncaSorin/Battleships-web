import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { bool, string, func } from "prop-types";

GameDotComponent.propTypes = {
  isShip: bool.isRequired,
  rowSize: string.isRequired,
  handleClick: func.isRequired,
  isGameOver: bool.isRequired,
};

export default function GameDotComponent(props) {
  const { isShip, rowSize, handleClick, isGameOver } = props;
  const height = Math.floor(500 / rowSize);
  const width = Math.floor(500 / rowSize);
  const classes = useStyles({ height, width, isShip });
  const [wasClicked, setWasClicked] = useState(false);

  useEffect(() => {
    setWasClicked(isGameOver);
  }, [isGameOver])

  const handleClickDot = () => {
    handleClick();
    setWasClicked(true);
  }

  return (
    <Box
      className={clsx(classes.boxWrapper, {[classes.boxClicked]: wasClicked})}
      onClick={!wasClicked ? handleClickDot : null}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  boxWrapper: {
    height: (props) => props.height,
    width: (props) => props.width,
    margin: 4,
    backgroundColor: "#00B2CA",
    border: '1px solid #00B2CA',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'white',
      border: '1px solid white',
      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    },
  },
  boxClicked: {
    backgroundColor: (props) => props.isShip ? 'green' : 'red',
    cursor: 'default',
    border: '1px solid white',
    '&:hover': {
      backgroundColor: (props) => props.isShip ? 'green' : 'red',
    },
  },
}));
