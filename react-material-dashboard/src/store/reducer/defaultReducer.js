const initialState = {
  domains: [],
  domain: {},
  loading: false
};

export const types = {
  LIST: 'LIST',
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  FETCH: 'FETCH',
  LOADING: 'LOADING'
};

function createCrudReducerWithNamedType(counterName = '') {
  return function counter(state = initialState, action) {
    switch (action.type) {
      case `${types.LOADING}_${counterName}`: {
        return { ...state, loading: action.loading };
      }
      case `${types.LIST}_${counterName}`: {
        return {
          ...state,
          domains: action.domains
        };
      }
      case `${types.ADD}_${counterName}`: {
        const lista = [...state.domains, action.domain];
        return { ...state, domains: lista, domain: {} };
      }
      case `${types.FETCH}_${counterName}`: {
        return { ...state, domain: action.domain };
      }
      case `${types.REMOVE}_${counterName}`: {
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
