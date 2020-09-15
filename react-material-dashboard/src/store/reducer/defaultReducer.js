const initialState = {
  filters: {},
  domains: [],
  domain: {},
  loading: false,
  message: ''
};

export const types = {
  FILTERS: 'FILTERS',
  LIST: 'LIST',
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  FETCH: 'FETCH',
  LOADING: 'LOADING',
  CLEAR: 'CLEAR',
  CLEARMESSAGE: 'CLEARMESSAGE'
};

function createCrudReducerWithNamedType(reducerName = '') {
  return function counter(state = initialState, action) {
    switch (action.type) {
      case `${types.LOADING}_${reducerName}`: {
        return { ...state, loading: action.loading };
      }
      case `${types.FILTERS}_${reducerName}`: {
        return {
          ...state,
          filters: action.filters,
          message: ''
        };
      }
      case `${types.LIST}_${reducerName}`: {
        return {
          ...state,
          domains: action.domains,
          message: ''
        };
      }
      case `${types.ADD}_${reducerName}`: {
        const index = state.domains.findIndex(
          (domain) => domain.id === action.domain.id
        );
        const { domains } = state;
        if (index >= 0) {
          domains[index] = action.domain;
          return { ...state, domains, domain: {} };
        }
        return {
          ...state,
          domains: [...state.domains, action.domain],
          domain: {},
          message: ''
        };
      }
      case `${types.FETCH}_${reducerName}`: {
        return { ...state, domain: action.domain, message: '' };
      }
      case `${types.CLEAR}_${reducerName}`: {
        return { ...state, domain: initialState.domain, message: '' };
      }
      case `${types.CLEARMESSAGE}_${reducerName}`: {
        return { ...state, message: '' };
      }
      case `${types.REMOVE}_${reducerName}`: {
        const { id } = action;
        const domains = state.domains.filter((domain) => domain.id !== id);
        return { ...state, domains, message: 'Removido com sucesso!' };
      }
      default:
        return state;
    }
  };
}

export default createCrudReducerWithNamedType;
