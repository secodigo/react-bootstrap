import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Card,
  CardContent,
  CssBaseline,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { salvar } from '../../../../store/tarefasReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(0)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  }
}));

const TarefasToolbar = (props) => {
  const { className, match, ...rest } = props;
  const { params } = match;
  const dispatch = useDispatch();
  const tarefas = useSelector((state) => state.tarefas);

  const [tarefaState, setTarefa] = useState({ descricao: '', categoria: '' });

  const classes = useStyles();

  useEffect(() => {
    const { id } = params;
    if (id) {
      const resultado = tarefas.tarefas.filter(
        (tarefa) => tarefa.id === parseInt(id)
      );
      if (resultado.length >= 1) {
        const tarefa = resultado[0];
        setTarefa(tarefa);
      }
    }
  }, []);

  const submit = (event) => {
    event.preventDefault();
    dispatch(salvar(tarefaState));
    setTarefa({ descricao: '', categoria: '' });
  };

  return (
    <Container className={classes.root} component="main" maxWidth="md">
      <CssBaseline />
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardContent className={classes.content}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h4">
              Tarefa
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className={classes.searchInput}
                    placeholder="Descrição da tarefa"
                    label="Descrição"
                    fullWidth
                    value={tarefaState.descricao}
                    onChange={(e) =>
                      setTarefa({
                        ...tarefaState,
                        descricao: e.target.value
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel>Categoria:</InputLabel>
                    <Select
                      value={tarefaState.categoria}
                      onChange={(e) =>
                        setTarefa({
                          ...tarefaState,
                          categoria: e.target.value
                        })
                      }>
                      <MenuItem value="">Selecione</MenuItem>
                      <MenuItem value={'TRABALHO'}>TRABALHO</MenuItem>
                      <MenuItem value="ESTUDOS">ESTUDOS</MenuItem>
                      <MenuItem value="OUTROS">OUTROS</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={submit}
                    variant="contained"
                    color="secondary">
                    Adicionar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

TarefasToolbar.propTypes = {
  className: PropTypes.string
};

export default TarefasToolbar;
