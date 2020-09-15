import { mostrarMensagem } from 'store/reducer/mensagensReducer';
import { Api, fetchByFilter, remove } from 'api/ApiRest';
import axios from 'axios';

const LoadingAction = {
  start: (reducer) => {
    return {
      type: `LOADING_${reducer}`,
      loading: true
    };
  },
  pause: (reducer) => {
    return {
      type: `LOADING_${reducer}`,
      loading: false
    };
  }
};
const defaultActions = {
  filters: (reducer, endPoint) => async (dispatch) => {
    await fetchByFilter(`/api/v1/common/search/filter/${endPoint.entity}`).then(
      (response) => {
        dispatch({
          type: `FILTERS_${reducer}`,
          filters: response.data.filter
        });
      }
    );
  },

  list: (reducer, endPoint, filter) => async (dispatch) => {
    dispatch(LoadingAction.start(reducer));
    await axios
      .all([
        fetchByFilter(`/api/v1/common/search/filter/${endPoint.entity}`),
        fetchByFilter(endPoint.search + endPoint.entity, filter)
      ])
      .then(
        axios.spread((...responses) => {
          dispatch({
            type: `LIST_${reducer}`,
            domains: responses[1].data[endPoint.entity],
            header: responses[0].data.filter
          });
        })
      );
    dispatch(LoadingAction.pause(reducer));
  },

  fetchById: (reducer, value) => (dispatch) => {
    dispatch(LoadingAction.start(reducer));
    dispatch({
      type: `FETCH_${reducer}`,
      domain: value
    });
    dispatch(LoadingAction.pause(reducer));
  },

  clear: (reducer) => (dispatch) => {
    dispatch({
      type: `CLEAR_${reducer}`
    });
  },

  clearMessage: (reducer) => (dispatch) => {
    dispatch({
      type: `CLEARMESSAGE_${reducer}`
    });
  },

  save: (reducer, endPoint, domain) => async (dispatch) => {
    dispatch(LoadingAction.start(reducer));
    const response = await Api.post(endPoint, domain);
    dispatch([
      {
        type: `ADD_${reducer}`,
        domain: response.data
      },
      mostrarMensagem('Salvo com sucesso!')
    ]);
    dispatch(LoadingAction.pause(reducer));
  },

  remove: (reducer, endPoint, id) => async (dispatch) => {
    dispatch(LoadingAction.start(reducer));
    await remove(`${endPoint.crud + endPoint.entity}`, id).then(() => {
      dispatch([
        {
          type: `REMOVE_${reducer}`,
          id
        },
        mostrarMensagem('Removido com sucesso!')
      ]);
    });
    dispatch(LoadingAction.pause(reducer));
  }
};

export default defaultActions;
