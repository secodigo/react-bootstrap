import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table } from 'components';
import defaultActions from 'store/actions/defaultActions';
import useStyles from './styles';

const List = ({ reducer }) => {
  const classes = useStyles();
  const { domains, loading } = useSelector((state) => state[reducer]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(defaultActions.list(reducer, 'tarefas'));
  }, []);

  const history = useHistory();

  const navigateTo = () =>
    history.push({
      pathname: `${window.location.pathname}/create`
    });

  const navigateToEdit = (id) =>
    history.push({
      pathname: `${window.location.pathname}/create/${id}`
    });

  const removeAction = (id) =>
    dispatch(defaultActions.remove(reducer, 'tarefas', id));

  return (
    <div className={classes.root}>
      <div>
        <Button onClick={navigateTo} variant="contained" color="secondary">
          Adicionar
        </Button>
      </div>
      <div className={classes.content}>
        <Table
          navigateToEdit={navigateToEdit}
          deleteAction={removeAction}
          domains={domains}
          loading={loading}
        />
      </div>
      {/* <Dialog open={props.openDialog} onClose={props.esconderMensagem}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>{props.mensagem}</DialogContent>
        <DialogActions>
          <Button onClick={props.esconderMensagem}>Fechar</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

List.propTypes = {
  reducer: PropTypes.string.isRequired
};

export default List;
