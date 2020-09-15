import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@material-ui/core';
import useStyles from './styles';

function ToolBar({ children }) {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.div}>
      <Toolbar style={{ justifyContent: 'flex-start' }}>{children}</Toolbar>
    </AppBar>
  );
}

ToolBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]).isRequired
};

export default ToolBar;
