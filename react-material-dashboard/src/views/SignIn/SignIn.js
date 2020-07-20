import React, { useState } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Typography, Container, Card, CardContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Message, AsyncButton, Input } from 'components';
import useStyles from './styles';
import login from './SiginService';

const SignIn = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [message, setMessage] = useState({ msg: '' });

  const classes = useStyles();

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <Card className={clsx(classes.paper)}>
        {message.msg && <Message message={message} />}
        <CardContent>
          <Formik
            initialValues={{
              username: 'NEOADMIN',
              password: '0904$%NEO'
            }}>
            {(values) => {
              const handleSignIn = async (event) => {
                event.preventDefault();
                return login(values.username, values.password)
                  .then(() => history.push('/home'))
                  .catch((err) => {
                    const msg = err.response || err.message;
                    setMessage({ msg });
                  });
              };

              return (
                <form className={classes.form}>
                  <Typography className={classes.title} variant="h2">
                    {t('LOGIN')}
                  </Typography>
                  <Typography
                    align="center"
                    className={classes.sugestion}
                    color="textSecondary"
                    variant="body1">
                    {t('ENTRE_COM_DADOS')}
                  </Typography>
                  <Input name="username" typefield="outlined" />
                  <Input name="password" typefield="outlined" />
                  <AsyncButton
                    fullWidth
                    type="submit"
                    text={t('ENTRAR')}
                    onClick={handleSignIn}
                  />
                </form>
              );
            }}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignIn;
