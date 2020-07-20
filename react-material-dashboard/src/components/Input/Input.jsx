import React from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import useStyles from './styles';

const Input = (props) => {
  const { name, typefield } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const [field, meta, helpers] = useField(name);
  
  return (
    <TextField
      {...field}
      {...props}
      className={classes.textField}
      fullWidth
      label={t(name)}
      name={name}
      variant={typefield}
      value={field.value || ''}
    />
  );
};

Input.defaultProps = {
  typefield: 'standard'
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  typefield: PropTypes.string
};

export default Input;
