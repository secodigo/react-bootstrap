import React, { useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';

const Message = ({ message, duration }) => {
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    setOpen(true);
  }, [message]);

  return (
    <div>
      <Snackbar
        data-testid="toast"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={duration || 6000}
        onClose={() => {
          setOpen(false);
        }}>
        <Alert
          data-testid="alert"
          variant="filled"
          severity="info"
          onClose={() => {
            setOpen(false);
          }}>
          {message.msg || message}
        </Alert>
      </Snackbar>
    </div>
  );
};

Message.defaultProps = {
  duration: 6000
};

Message.propTypes = {
  message: PropTypes.shape({
    msg: PropTypes.string.isRequired
  }).isRequired,
  duration: PropTypes.number
};

export default Message;
