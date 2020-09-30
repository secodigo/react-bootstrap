import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  InputLabel,
  Typography,
  Button
} from '@material-ui/core';
import Keyboard from '@material-ui/icons/Keyboard';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Autocomplete } from '@material-ui/lab';
import { useDebouncedCallback } from 'use-debounce';
import useStyles from './styles';

function Input(props) {
  const {
    onOpenSearch,
    itens,
    onDelete,
    onSearchOptions,
    options = [],
    onSelectTag,
    label,
    error
  } = props;
  const [state, setState] = useState([]);
  const stateOld = useRef([]);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [debouncedCallback] = useDebouncedCallback((value) => {
    onSearchOptions(value);
    setTextFieldValue(value);
  }, 500);

  useEffect(() => {
    if (JSON.stringify(stateOld.current) !== JSON.stringify(itens)) {
      stateOld.current = itens;
      setState(itens);
    }
  }, [itens]);

  const classes = useStyles();

  const renderOption = (option) => (
    <Button
      style={{ width: '100%', height: '100%', justifyContent: 'flex-start' }}
      onClick={() => onSelectTag(option)}>
      <Typography style={{ color: 'black' }}>{option.display}</Typography>
    </Button>
  );

  const renderInput = (params) => {
    const values = () => {
      const array = [];
      array.push(
        <InputAdornment position="start">
          <IconButton onClick={() => onOpenSearch(state)}>
            <Keyboard />
          </IconButton>
        </InputAdornment>
      );
      array.push(params?.InputProps?.startAdornment);
      return array;
    };

    const handleChange = (e) => {
      debouncedCallback(e.target.value);
    };

    return (
      <TextField
        {...params}
        variant="standard"
        className={clsx(classes.textField, props.className)}
        fullWidth
        id="standard-search"
        label={label}
        type="search"
        value={textFieldValue}
        onChange={handleChange}
        error={!!error}
        helperText={error}
        InputProps={{
          ...params.InputProps,
          startAdornment: values()?.map((e, index) => (
            <div key={index}>{e}</div>
          ))
        }}
      />
    );
  };

  const renderTags = (value, getTagProps) =>
    value.map((option, index) => (
      <Chip
        variant="outlined"
        label={option.display}
        {...getTagProps({ index })}
        onDelete={() => onDelete(option)}
      />
    ));

  return (
    <div>
      <Autocomplete
        multiple
        id="tags-standard"
        options={options}
        getOptionLabel={(option) => option.display}
        defaultValue={state}
        value={state}
        renderOption={renderOption}
        freeSolo
        renderTags={renderTags}
        renderInput={renderInput}
      />
    </div>
  );
}

Input.propTypes = {
  onOpenSearch: PropTypes.func.isRequired,
  itens: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSearchOptions: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectTag: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default Input;
