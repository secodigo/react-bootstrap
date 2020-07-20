import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { AppBar, Toolbar, Card, CardContent } from '@material-ui/core';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { AsyncButton } from 'components';
import actions from 'store/actions/defaultActions';
import useStyles from './styles';

const Form = ({ children, reducer }) => {
  const classes = useStyles();
  const { domains, domain } = useSelector((state) => state[reducer]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      const resultado = domains.filter((value) => value.id === parseInt(id));
      if (resultado.length >= 1) {
        dispatch(actions.fetchById(reducer, resultado[0]));
      }
    }
  }, []);

  return (
    <div className={clsx(classes.root)}>
      <Formik initialValues={domain} enableReinitialize>
        {({ values, resetForm }) => {
          const handleSubmit = async (event) => {
            event.preventDefault();
            return dispatch(actions.save(reducer, 'tarefas', values)).then(() =>
              resetForm()
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
                </Toolbar>
              </AppBar>
              <form className={classes.form}>
                <Card>
                  <CardContent className={classes.content}>
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
  reducer: PropTypes.string.isRequired
};

export default Form;
