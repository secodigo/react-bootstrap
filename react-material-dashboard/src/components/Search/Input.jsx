import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton, Chip } from '@material-ui/core';
import Keyboard from '@material-ui/icons/Keyboard';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Autocomplete } from '@material-ui/lab';
import useStyles from './styles';

function Input(props) {
  const { onClickSearch, itens, onDelete } = props;
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(itens);
  }, [itens]);

  const classes = useStyles();
  return (
    <div>
      <Autocomplete
        multiple
        id="tags-standard"
        options={[]}
        getOptionLabel={(option) => option.display}
        value={state}
        filterSelectedOptions
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.display}
              {...getTagProps({ index })}
              onDelete={() => onDelete(option)}
            />
          ))
        }
        renderInput={(params) => {
          const values = () => {
            const array = [];
            array.push(
              <InputAdornment position="start">
                <IconButton onClick={() => onClickSearch(state)}>
                  <Keyboard />
                </IconButton>
              </InputAdornment>
            );
            array.push(params?.InputProps?.startAdornment);
            return array;
          };

          return (
            <TextField
              {...props}
              {...params}
              variant="standard"
              className={clsx(classes.textField, props.className)}
              fullWidth
              id="standard-search"
              label="Pesquisar..."
              type="search"
              onClick={() => false}
              InputProps={{
                ...params.InputProps,
                startAdornment: values()?.map((e, index) => (
                  <div key={index}>{e}</div>
                ))
              }}
            />
          );
        }}
      />
    </div>
  );
}

Input.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Input;
