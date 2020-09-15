import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

const Picker = ({ name, className }) => {
  const [field, , helpers] = useField(name);
  const { t } = useTranslation();

  const handleDateChange = (date) => {
    helpers.setValue(date);
  };

  return (
    <div className={className}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          {...field}
          id="date-picker-dialog"
          label={t(name)}
          format="dd/MM/yyyy"
          margin="none"
          value={(field.value && new Date(field.value)) || null}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default Picker;
