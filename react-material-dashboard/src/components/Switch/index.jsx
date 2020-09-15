import React from 'react';
import Switch from '@material-ui/core/Switch';
import { FormControlLabel } from '@material-ui/core';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useStyles from './styles';

const SwitchCustom = ({ type, name, className }) => {
  const [field, , helpers] = useField(name);
  const classes = useStyles();
  const { t } = useTranslation();

  const handleChange = (event) => {
    if (type === 'string') {
      helpers.setValue(event.target.checked ? 'S' : 'N');
    }
  };

  const getValue = () => {
    if (type === 'string') {
      return field.value === 'S';
    }
    return field.value;
  };

  const getLabel = () => {
    if (type === 'string') {
      return t(`${name}${field.value || 'N'}`);
    }
    return t(`${name}${field.value || false}`);
  };
  return (
    <div className={clsx(classes.switch, className)}>
      <FormControlLabel
        control={
          <Switch
            {...field}
            checked={getValue()}
            onChange={handleChange}
            name="checkedA"
            color="primary"
          />
        }
        label={getLabel()}
      />
    </div>
  );
};

SwitchCustom.defaultProps = {
  className: ''
};

SwitchCustom.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default SwitchCustom;
