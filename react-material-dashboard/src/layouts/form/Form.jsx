import React, { useEffect } from 'react';
import { Formik } from 'formik';
import {
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { AsyncButton } from 'components';
import actions from 'store/actions/defaultActions';
import useStyles from './styles';

const Form = ({ children, reducer, endPoint, title }) => {
  const classes = useStyles();
  const { domains, domain } = useSelector((state) => state[reducer]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { goBack } = useHistory();

  useEffect(() => {
    if (id) {
      const resultado = domains.filter((value) => value.id === parseInt(id));
      if (resultado.length >= 1) {
        dispatch(actions.fetchById(reducer, resultado[0]));
      }
    }
    return () => {
      dispatch(actions.clear(reducer));
    };
  }, []);

  return (
    <div className={clsx(classes.root)}>
      <Formik initialValues={domain} enableReinitialize>
        {({ values, resetForm }) => {
          const handleSubmit = async (event) => {
            event.preventDefault();
            return dispatch(actions.save(reducer, endPoint, values)).then(
              () => {
                resetForm();
                goBack();
              }
            );
          };

          return (
            <>
              <AppBar position="sticky" className={classes.div}>
                <Toolbar style={{ justifyContent: 'flex-start' }}>
                  <AsyncButton
                    type="submit"
                    text={t('SAVE')}
                    onClick={handleSubmit}
                  />
                  <AsyncButton
                    style={{ marginLeft: 10 }}
                    text={t('CANCELAR')}
                    onClick={() => goBack()}
                  />
                </Toolbar>
              </AppBar>
              <form className={classes.form}>
                <Card>
                  <CardContent className={classes.content}>
                    <Typography component="h1" variant="h4">
                      {t(title)}
                    </Typography>
                    {children === 'function' ? children(values) : children}
                  </CardContent>
                </Card>
              </form>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
  reducer: PropTypes.string.isRequired,
  endPoint: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Form;
