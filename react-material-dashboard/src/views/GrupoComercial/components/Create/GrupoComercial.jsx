import React from 'react';
import { Grid } from '@material-ui/core';

import { Input } from 'components';
import { Form } from 'layouts';

const GrupoComercial = () => {
  return (
    <Form
      title="GRUPO_COMERCIAL"
      reducer="grupocomercial"
      endPoint={{
        search: '/api/v1/common/search/',
        crud: '/api/v1/common/crud/',
        entity: 'grupocomercial'
      }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <Input name="descricao" />
        </Grid>
      </Grid>
    </Form>
  );
};

export default GrupoComercial;
