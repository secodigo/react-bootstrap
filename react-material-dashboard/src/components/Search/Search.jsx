import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Table from 'components/Table';
import { useSelector, useDispatch } from 'react-redux';
import defaultActions from 'store/actions/defaultActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Dialog } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import Input from './Input';
import useStyles from './styles';

const Search = ({ reducer, endPoint, title }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.only('xs'));
  const { domains, loading, filters } = useSelector((state) => state[reducer]);

  useEffect(() => {
    dispatch(defaultActions.filters(reducer, endPoint));
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchRegisters = (value) => {
    const params = new URLSearchParams();
    params.append(endPoint.filterDefault, value);
    dispatch(defaultActions.list(reducer, endPoint, params));
  };

  const checkedRows = (rows, row) => {
    if (row === undefined) {
      setSelectedRows(rows);
      return;
    }
    if (row?.tableData?.checked) {
      if (selectedRows.filter((item) => item.id === row.id).length === 0) {
        setSelectedRows([...selectedRows, { ...row }]);
      }
      return;
    }
    setSelectedRows(rows.filter((item) => item.id !== row.id));
  };

  const removeRow = (row) => {
    setSelectedRows(selectedRows.filter((item) => item.id !== row.id));
  };

  return (
    <>
      <Input
        onClickSearch={handleOpen}
        itens={selectedRows}
        onDelete={removeRow}
      />
      <Dialog
        fullScreen={matchesXS}
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        PaperProps={
          !matchesXS
            ? {
                style: { borderRadius: 10 }
              }
            : {}
        }>
        <Fade in={open}>
          <Table
            className={classes.paper}
            domains={domains}
            loading={loading}
            header={filters}
            title={title}
            onChecked={checkedRows}
            onPressEnter={fetchRegisters}
          />
        </Fade>
      </Dialog>
    </>
  );
};

Search.propTypes = {
  reducer: PropTypes.string.isRequired,
  endPoint: PropTypes.shape({
    search: PropTypes.string.isRequired,
    entity: PropTypes.string.isRequired,
    filterDefault: PropTypes.string.isRequired
  }).isRequired,
  title: PropTypes.string.isRequired
};

export default Search;
