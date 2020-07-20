import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@material-ui/core';
import useStyles from './styles';

const AsyncButton = ({ text, disabled, onClick, ...attributes }) => {
  const [asyncState, setAsyncState] = useState(false);

  const isUnmounted = useRef(false);

  const classes = useStyles();

  useEffect(() => {
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  const resetState = () => {
    setAsyncState(false);
  };

  const handleClick = async (...args) => {
    const clickHandler = onClick;
    if (typeof clickHandler === 'function') {
      setAsyncState(true);

      const returnFn = clickHandler(...args);
      if (returnFn && typeof returnFn.then === 'function') {
        returnFn
          .then(() => {
            if (isUnmounted.current) return;
            setAsyncState(false);
          })
          .catch((error) => {
            if (isUnmounted.current) return;
            setAsyncState(false);
            throw error;
          });
      } else {
        resetState();
      }
    }
  };

  const isDisabled = asyncState;

  return (
    <Button
      {...attributes}
      data-testid="button"
      color="secondary"
      variant="contained"
      className={classes.submit}
      disabled={isDisabled || disabled}
      onClick={(event) => handleClick(event)}>
      {asyncState ? (
        <CircularProgress
          data-testid="circularProgres"
          size={24}
          className={classes.buttonProgress}
        />
      ) : (
        <>{text}</>
      )}
    </Button>
  );
};

AsyncButton.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func
};

export default AsyncButton;
