import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from '../../../../components';
import { Form } from '../../../../layouts';
import { salvar } from '../../../../store/tarefasReducer';

const TarefasToolbar = (props) => {
  const { className, match, ...rest } = props;
  const { params } = match;
  const dispatch = useDispatch();
  const tarefas = useSelector((state) => state.tarefas);

  useEffect(() => {
    const { id } = params;
    if (id) {
      const resultado = tarefas.tarefas.filter(
        (tarefa) => tarefa.id === parseInt(id)
      );
      if (resultado.length >= 1) {
        const tarefa = resultado[0];
        // setTarefa(tarefa);
      }
    }
  }, []);

  const submit = (values) => {
    return dispatch(salvar(values));
  };
  return (
    <Form
      initialValues={{ descricao: '', categoria: 'ESTUDOS' }}
      submit={submit}>
      <Typography component="h1" variant="h4">
        Tarefa
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <Input name="descricao" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Input name="categoria" />
        </Grid>
      </Grid>
    </Form>
  );
};

TarefasToolbar.propTypes = {
  className: PropTypes.string
};

export default TarefasToolbar;
