import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext({
  open: false,
  setOpen: (open) => {},
  message: '',
  setMessage: (message) => {},
  severity: '',
  setSeverity: (severity) => {},
});

export function useNotification() {
  const {open, setOpen, message, setMessage, severity, setSeverity} = useContext(NotificationContext);

  function createNotification(message, severity) {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
  }

  return {
    open,
    message,
    severity,
    setOpen,
    setMessage,
    setSeverity,
    createNotification,
  }
}

export function NotificationProvider({children}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const context = {
    open, setOpen, message, setMessage, severity, setSeverity,
  }

  return(
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}