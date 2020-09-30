import { mostrarMensagem } from 'store/reducer/mensagensReducer';
import { Api, fetchByFilter, remove, fetchById } from 'api/ApiRest';
import loadingAction from './loadingActions';

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
    dispatch(loadingAction.start(reducer));
    await fetchByFilter(endPoint.search + endPoint.entity, filter).then(
      (responses) => {
        dispatch({
          type: `LIST_${reducer}`,
          domains: responses.data[endPoint.entity]
        });
      }
    );
    dispatch(loadingAction.pause(reducer));
  },

  fetchById: (reducer, endPoint, id) => (dispatch) => {
    dispatch(loadingAction.start(reducer));
    fetchById(endPoint.search + endPoint.entity, id).then((response) => {
      dispatch({
        type: `FETCH_${reducer}`,
        domain: response.data[endPoint.entity][0]
      });
    });
    dispatch(loadingAction.pause(reducer));
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
    dispatch(loadingAction.start(reducer));
    const response = await Api.post(endPoint.crud + endPoint.entity, domain);
    dispatch([
      {
        type: `ADD_${reducer}`,
        domain: response.data
      },
      mostrarMensagem('Salvo com sucesso!')
    ]);
    dispatch(loadingAction.pause(reducer));
  },

  remove: (reducer, endPoint, id) => async (dispatch) => {
    dispatch(loadingAction.start(reducer));
    await remove(`${endPoint.crud + endPoint.entity}`, id).then(() => {
      dispatch([
        {
          type: `REMOVE_${reducer}`,
          id
        },
        mostrarMensagem('Removido com sucesso!')
      ]);
    });
    dispatch(loadingAction.pause(reducer));
  }
};

export default defaultActions;
