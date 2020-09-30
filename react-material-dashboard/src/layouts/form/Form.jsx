import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Card, CardContent, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { AsyncButton } from 'components';
import defaultAction from 'store/actions/defaultActions';
import { ToolBar } from 'layouts';
import useStyles from './styles';

const Form = ({ children, reducer, endPoint, title, action, schema }) => {
  const classes = useStyles();
  const { domain } = useSelector((state) => state[reducer]);
  const match = useRouteMatch();
  const { id } = match.params;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { goBack } = useHistory();

  useEffect(() => {
    if (id) {
      dispatch(
        (action?.fetchById || defaultAction.fetchById)(reducer, endPoint, id)
      );
    }
    return () => {
      dispatch((action?.clear || defaultAction.clear)(reducer));
    };
  }, []);

  const submit = async (values, resetForm) => {
    return dispatch(
      (action?.save || defaultAction.save)(reducer, endPoint, values)
    ).then(() => {
      resetForm();
      goBack();
    });
  };

  return (
    <div className={clsx(classes.root)}>
      <Formik
        initialValues={domain}
        validationSchema={schema}
        enableReinitialize
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submit(values, resetForm, setSubmitting);
        }}>
        {({ values, handleSubmit, isValidating, isSubmitting }) => {
          return (
            <>
              <form
                className={classes.form}
                onSubmit={(e) => e.preventDefault()}>
                <ToolBar>
                  <AsyncButton
                    type="submit"
                    text={t('SAVE')}
                    async={isValidating || isSubmitting}
                    onClick={handleSubmit}
                  />
                  <AsyncButton
                    style={{ marginLeft: 10 }}
                    text={t('CANCELAR')}
                    onClick={() => goBack()}
                  />
                </ToolBar>

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
  endPoint: PropTypes.oneOfType([PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.oneOfType([PropTypes.object]).isRequired,
  schema: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default Form;
