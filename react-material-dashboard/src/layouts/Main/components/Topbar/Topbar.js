import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Api } from '../../../../api/ApiRest';
import { removeToken } from '../../../../service/authenticate';
import { Message } from '../../../../components';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 65,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      minHeight: 65
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 64
    },
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = (props) => {
  const { className, history, onSidebarOpen, staticContext } = props;

  const [message, setMessage] = useState({ msg: '' });

  const classes = useStyles();

  const logout = async () => {
    await Api.post('/api/v1/authentication/logout')
      .then(() => {
        removeToken();
        history.push('/login');
      })
      .catch((err) => {
        const msg = err.response || err.message;
        setMessage({ msg });
      });
  };

  return (
    <AppBar className={clsx(classes.root, className)}>
      {message.msg && <Message message={message} />}
      <Toolbar>
        <RouterLink to="/">
          <h1 style={{ color: 'white' }}>Neo Sistemas</h1>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton
            onClick={logout}
            className={classes.signOutButton}
            color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.defaultProps = {
  className: ''
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = (state) => ({
  notifications: state.tarefas.quantidade
});

export default compose(connect(mapStateToProps), withRouter)(Topbar);
