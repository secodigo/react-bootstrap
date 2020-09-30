import React from 'react';
import { Grid } from '@material-ui/core';

import { Input, Switch, Picker, Search } from 'components';
import useStyles from './styles';

const Dados = () => {
  const styles = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <Input name="name" />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Input name="fullName" />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Input name="email" />
      </Grid>
      <Grid item xs={12} sm={2} md={4} lg={2}>
        <Switch name="active" type="string" />
      </Grid>
      <Grid item xs={12} sm={3} md={4} lg={3}>
        <Switch
          name="enableForgottenPassword"
          type="string"
          className={styles.switch}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={7}>
        <Picker name="passwordExpirationDate" className={styles.switch} />
      </Grid>
      <Grid item>
        <Input name="newPassword" className={styles.fieldNumber} />
        <Input name="confirmPassword" className={styles.fieldNumber} />
      </Grid>
      <Grid item>
        <Input
          name="tempoSessao"
          type="number"
          className={styles.fieldNumber}
        />
        <Input
          name="quantidadeDiasSemAcessoInativado"
          type="number"
          className={styles.fieldNumber}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Search
          reducer="group"
          title="Grupo de usuários"
          endPoint={{
            search: '/api/v1/common/search/',
            entity: 'group',
            filterDefault: 'nomegus'
          }}
          name="groups"
        />
      </Grid>
    </Grid>
  );
};

export default Dados;
