import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import {
  listar,
  salvar,
  deletar,
  alterarStatus
} from '../../store/tarefasReducer';

import { esconderMensagem } from '../../store/mensagensReducer';

import { TarefasTable } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefaList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.listar();
  }, []);

  const history = useHistory();

  const navigateTo = () =>
    history.push({
      pathname: '/tarefas/create'
    });

  const navigateToEdit = (id) =>
    history.push({
      pathname: `/tarefas/create/${id}`
    });

  return (
    <div className={classes.root}>
      <div>
        <Button onClick={navigateTo} variant="contained" color="secondary">
          Adicionar
        </Button>
      </div>
      <div className={classes.content}>
        <TarefasTable
          navigateToEdit={navigateToEdit}
          deleteAction={props.deletar}
          tarefas={props.tarefas}
        />
      </div>
      <Dialog open={props.openDialog} onClose={props.esconderMensagem}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>{props.mensagem}</DialogContent>
        <DialogActions>
          <Button onClick={props.esconderMensagem}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tarefas: state.tarefas.tarefas,
  mensagem: state.mensagens.mensagem,
  openDialog: state.mensagens.mostrarMensagem
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      listar,
      salvar,
      deletar,
      alterarStatus,
      esconderMensagem
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TarefaList);
