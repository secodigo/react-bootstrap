import React from 'react';
import { Formik } from 'formik';
import { AppBar, Toolbar, Card, CardContent } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AsyncButton } from 'components';
import useStyles from './styles';

const Form = ({ children, initialValues, submit }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root)}>
      <Formik initialValues={initialValues}>
        {({ values }) => {
          const handleSubmit = async (event) => {
            event.preventDefault();
            if (submit) {
              return submit(values);
            }
          };

          return (
            <>
              <AppBar position="sticky" className={classes.div}>
                <Toolbar style={{ justifyContent: 'flex-start' }}>
                  <AsyncButton
                    type="submit"
                    text="SALVAR"
                    onClick={handleSubmit}
                  />
                  <div style={{ padding: '0.3em' }} />
                  <AsyncButton text="EXCLUIR" onClick={handleSubmit} />
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

Form.defaultProps = {
  submit: undefined
}

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  initialValues: PropTypes.shape(PropTypes.object).isRequired,
  submit: PropTypes.func
};

export default Form;
