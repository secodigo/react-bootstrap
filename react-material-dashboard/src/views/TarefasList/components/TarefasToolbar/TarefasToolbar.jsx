import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { Input } from 'components';
import { Form } from 'layouts';

const TarefasToolbar = () => {
  return (
    <Form reducer="tarefas2">
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

export default TarefasToolbar;
