import React from 'react';
import {Button as MuiButton, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    background: 'black',
    color: 'white',
    '&:hover': {
      background: '#4d4d4d',
    },
  }
});

export function Button({children, ...other}) {
  const classes = useStyles();

  return(
    <MuiButton variant='contained' classes={{root: classes.root}} {...other}>
      {children}
    </MuiButton>
  )
}

export function OutlinedButton({children, ...other}) {
  return(
    <MuiButton variant='outlined' {...other}>
      {children}
    </MuiButton>
  );
}