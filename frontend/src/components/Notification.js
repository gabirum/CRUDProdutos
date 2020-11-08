import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useNotification } from './useNotification';

function Notification() {
  const {open, setOpen, message, severity} = useNotification();

  return (
    <Snackbar 
      open={open} 
      autoHideDuration={3000} 
      onClose={() => setOpen(false)} 
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
      <Alert onClose={() => setOpen(false)} severity={severity}>{message}</Alert>
    </Snackbar>
  );
}

export default Notification;