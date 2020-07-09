import React, { useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Message = ({ message }) => {
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    setOpen(true);
  }, [message]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}>
        <Alert
          variant="filled"
          severity="info"
          onClose={() => {
            setOpen(false);
          }}>
          {message.msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Message;
