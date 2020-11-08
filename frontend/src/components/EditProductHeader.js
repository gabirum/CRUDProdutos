import { Container, IconButton, makeStyles } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-start'
  }
});

function EditProductHeader({title, returnAction}) {
  const classes = useStyles();

  return(
    <Container classes={{root: classes.root}}>
      <IconButton onClick={returnAction}>
        <ArrowBackIos/>
      </IconButton>
      <h1>{title}</h1>
    </Container>
  );
}

export default EditProductHeader;