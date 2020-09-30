import React from 'react';
import { List } from 'components';

const GrupoComercial = () => {
  return (
    <List
      reducer="grupocomercial"
      title="Grupos Comerciais"
      endPoint={{
        search: '/api/v1/common/search/',
        crud: '/api/v1/common/',
        entity: 'grupocomercial',
        filterDefault: 'descricao'
      }}
    />
  );
};

export default GrupoComercial;
