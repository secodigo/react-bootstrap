import React, { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem } from '@material-ui/core';

import { TableEdit } from 'components';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import defaultActions from 'store/actions/defaultActions';
import { useFormikContext } from 'formik';

const useStyles = makeStyles((theme) => ({
  fieldNumber: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingRight: 100,
      width: 450
    }
  },
  switch: {
    width: 280
  }
}));

const DadosEmail = () => {
  const dispatch = useDispatch();
  // const { domains, filters } = useSelector((state) => state.usermail);
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    return () => dispatch(defaultActions.clearMessage('usermail'));
  }, []);

  const columns = () => [
    {
      title: 'Email',
      field: 'email'
    },
    {
      title: 'Senha',
      field: 'senhaAcesso',
      render: (rowData) => <div>**********</div>,
      editComponent: (props) => (
        <TextField
          value={props.value}
          type="password"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Tipo Servidor',
      field: 'tipoServidor',
      editComponent: (props) => (
        <Select
          fullWidth
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}>
          <MenuItem value="SMTP">SMTP</MenuItem>
          <MenuItem value="POP">POP</MenuItem>
          <MenuItem value="IMAP">IMAP</MenuItem>
        </Select>
      )
    },
    { title: 'Usuário', field: 'usuarioAcesso' },
    { title: 'Host', field: 'host' },
    { title: 'Porta', field: 'porta', type: 'numeric' },
    {
      title: 'Segurança',
      field: 'segurancaConexao',
      render: (rowData) => {
        let value = '';
        switch (rowData.segurancaConexao) {
          case 'P':
            value = 'Padrão';
            break;
          case 'S':
            value = 'SSL';
            break;
          case 'T':
            value = 'TSL';
            break;
          default:
            value = 'Nenhum';
            break;
        }
        return <div>{value}</div>;
      },
      editComponent: (props) => (
        <Select
          fullWidth
          value={props.value || 'N'}
          onChange={(e) => props.onChange(e.target.value)}>
          <MenuItem value="P">Padrão</MenuItem>
          <MenuItem value="S">SSL</MenuItem>
          <MenuItem value="T">TLS</MenuItem>
          <MenuItem value="N">Nenhum</MenuItem>
        </Select>
      )
    }
  ];

  const updateEmails = (data) => {
    console.log(data);
    setFieldValue('userMails', [...data]);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <TableEdit
            domains={values.userMails}
            columns={columns()}
            onUpdate={updateEmails}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DadosEmail;
