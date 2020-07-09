import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TextField,
  Typography,
  Container,
  CssBaseline,
  Card,
  CardContent
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Api } from '../../api/ApiRest';
import { SaveToken } from '../../service/authenticate';
import useStyles from './styles';
import { Message, AsyncButton } from '../../components';

const SignIn = (props) => {
  const { t } = useTranslation();
  const { history } = props;
  const [message, setMessage] = useState({ msg: '' });

  const classes = useStyles();

  const [state, setState] = useState({
    username: 'NEOADMIN',
    password: '0904$%NEO'
  });

  const validateResponse = async (response) => {
    if (response.status === 200) {
      SaveToken(response.data);
    } else if (response.status === 401) {
      throw new Error(t('LOGIN_MSG_USER_PASS_INVALID'));
    }
  };

  const login = async (username, password) => {
    return Api.post('/api/v1/authentication', { username, password })
      .then((response) => validateResponse(response))
      .catch((err) => {
        if (err.response) {
          return validateResponse(err.response);
        }
        throw err;
      });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    return login(state.username, state.password)
      .then(() => history.push('/home'))
      .catch((err) => {
        const msg = err.response || err.message;
        setMessage({ msg });
      });
  };

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline />
      {message.msg && <Message message={message} />}
      <Card className={clsx(classes.paper)}>
        <CardContent>
          <form className={classes.form} onSubmit={handleSignIn}>
            <Typography className={classes.title} variant="h2">
              Login
            </Typography>
            <Typography
              align="center"
              className={classes.sugestion}
              color="textSecondary"
              variant="body1">
              Entre com os dados de Login
            </Typography>
            <TextField
              className={classes.textField}
              fullWidth
              label="Usúario"
              name="username"
              variant="outlined"
              value={state.username}
              onChange={(e) =>
                setState({
                  ...state,
                  username: e.target.value
                })
              }
            />
            <TextField
              className={classes.textField}
              fullWidth
              label="Senha"
              name="password"
              variant="outlined"
              value={state.password}
              onChange={(e) =>
                setState({
                  ...state,
                  password: e.target.value
                })
              }
            />
            <div>
              <AsyncButton type="submit" text="ENTRAR" onClick={handleSignIn} />
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

SignIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(SignIn);
