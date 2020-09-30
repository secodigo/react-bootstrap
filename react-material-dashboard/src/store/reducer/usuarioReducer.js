import createCrudReducerWithNamedType from './defaultReducer';

const initialState = {
  filters: {},
  domains: [],
  domain: {},
  loading: false,
  message: '',
  groups: []
};

export const types = {
  FILTERS: 'FILTERS_usuario',
  LIST: 'LIST_usuario',
  ADD: 'ADD_usuario',
  REMOVE: 'REMOVE_usuario',
  FETCH: 'FETCH_usuario',
  LOADING: 'LOADING_usuario',
  CLEAR: 'CLEAR_usuario',
  CLEARMESSAGE: 'CLEARMESSAGE_usuario'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH: {
      const groups = action.domain?.userGroups?.map((userGroup) => {
        return userGroup.group;
      });
      return {
        ...state,
        domain: { ...action.domain, groups },
        message: ''
      };
    }
    default:
      return createCrudReducerWithNamedType('usuario')(state, action);
  }
};
