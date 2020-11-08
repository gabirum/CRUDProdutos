import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
  }
}));

function EditProductContainer({children}) {
  const classes = useStyles();

  return(
    <Container maxWidth='xs' classes={{root: classes.root}}>
      {children}
    </Container>
  );
}

export default EditProductContainer;