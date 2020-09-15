import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { Sidebar, Topbar } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 36,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 44
    }
  },
  shiftContent: {
    paddingLeft: 50
  }
}));

const Main = (props) => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}>
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={openSidebar}
        variant={isDesktop ? 'permanent' : 'temporary'}
      />
      <main>{children}</main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
