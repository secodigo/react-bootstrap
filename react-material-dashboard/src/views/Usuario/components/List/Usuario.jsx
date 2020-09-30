import React from 'react';
import { List } from 'components';

const Usuario = () => {
  return (
    <List
      reducer="usuario"
      title="Usuários"
      endPoint={{
        search: '/api/v1/common/search/',
        crud: '/api/v1/common/crud/',
        entity: 'user',
        filterDefault: 'name'
      }}
    />
  );
};

export default Usuario;
