import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';

function Search(props) {
  const { onClick } = props;
  const [state, setState] = useState('');
  return (
    <div>
      <TextField
        {...props}
        fullWidth
        id="standard-search"
        label="Pesquisar..."
        type="search"
        value={state}
        onChange={(e) => setState(e.target.value)}
        onClick={() => false}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => onClick(state)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>
  );
}

Search.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Search;
