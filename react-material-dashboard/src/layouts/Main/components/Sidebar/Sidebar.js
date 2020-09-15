import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Divider, Drawer } from '@material-ui/core';

import { Group, Person } from '@material-ui/icons';
import { Profile, SidebarNav } from './components';
import useStyles from './styles';

const Sidebar = (props) => {
  const { open: openProp, variant, onClose, className, ...rest } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const pages = [
    {
      title: 'Grupo Comercial',
      href: '/grupocomercial',
      icon: <Group />
    },
    {
      title: 'Usuário',
      href: '/usuario',
      icon: <Person />
    }
  ];

  const drawerStyles = variant === 'permanent' && {
    [classes.drawerOpen]: open,
    [classes.drawerClose]: !open
  };
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={openProp || open}
      variant={variant}
      onMouseOver={() => variant === 'permanent' && handleDrawerOpen()}
      onMouseOut={() => variant === 'permanent' && handleDrawerClose()}
      className={clsx(classes.drawer, drawerStyles)}
      classes={{
        paper: clsx(drawerStyles)
      }}>
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} onClick={onClose} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
