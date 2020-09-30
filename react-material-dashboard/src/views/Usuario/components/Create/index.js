import React from 'react';
import usuarioActions from 'store/actions/usuarioActions';
import Form from 'layouts/form/Form';
import { Tabs } from 'components';
import { object, string, array } from 'yup';
import I18n from '../../../../i18n';
import Dados from './Dados';
import DadosEmail from './DadosEmail';

const schema = object().shape({
  name: string().required(I18n.t('FIELD_OBRIGATORIO')).nullable(),
  newPassword: string().required(I18n.t('FIELD_OBRIGATORIO')).nullable(),
  confirmPassword: string().test(
    'newPassword',
    I18n.t('PASSWORD_NOT_MATCH'),
    function validatePassword(val) {
      return this.parent.newPassword === val;
    }
  ),
  groups: array()
    .required(I18n.t('FIELD_OBRIGATORIO'))
    .min(1, 'Informe pelo menos 1 grupo')
    .nullable()
});

function UsuarioTab() {
  const allTabs = [
    {
      nome: 'Dados',
      url: '',
      componente: <Dados />
    },
    {
      nome: 'E-mail',
      url: '/email',
      componente: <DadosEmail />
    }
  ];

  return (
    <Form
      schema={schema}
      title="USUARIO"
      reducer="usuario"
      action={usuarioActions}
      endPoint={{
        search: '/api/v1/common/search/',
        crud: '/api/v1/common/',
        entity: 'user'
      }}>
      <Tabs tabs={allTabs} />
    </Form>
  );
}

export default UsuarioTab;
