const initialState = {
  header: {},
  domains: [],
  domain: {},
  loading: false
};

export const types = {
  LIST: 'LIST',
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  FETCH: 'FETCH',
  LOADING: 'LOADING',
  CLEAR: 'CLEAR'
};

function createCrudReducerWithNamedType(reducerName = '') {
  return function counter(state = initialState, action) {
    switch (action.type) {
      case `${types.LOADING}_${reducerName}`: {
        return { ...state, loading: action.loading };
      }
      case `${types.LIST}_${reducerName}`: {
        return {
          ...state,
          domains: action.domains
        };
      }
      case `${types.ADD}_${reducerName}`: {
        const lista = [...state.domains, action.domain];
        return { ...state, domains: lista, domain: {} };
      }
      case `${types.FETCH}_${reducerName}`: {
        return { ...state, domain: action.domain };
      }
      case `${types.CLEAR}_${reducerName}`: {
        return { ...state, domain: initialState.domain };
      }
      case `${types.REMOVE}_${reducerName}`: {
        const { id } = action;
        const domains = state.domains.filter((domain) => domain.id !== id);
        return { ...state, domains };
      }
      default:
        return state;
    }
  };
}

export default createCrudReducerWithNamedType;
