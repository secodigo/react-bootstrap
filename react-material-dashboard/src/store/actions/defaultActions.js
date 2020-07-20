import Axios from 'axios';
import { mostrarMensagem } from 'store/reducer/mensagensReducer';

const Api = Axios.create({
  baseURL: 'https://minhastarefas-api.herokuapp.com',
  headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
});

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
  list: (reducer, endPoint) => async (dispatch) => {
    dispatch(LoadingAction.start(reducer));
    await Api.get(endPoint).then((response) => {
      dispatch({
        type: `LIST_${reducer}`,
        domains: response.data
      });
    });
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
    await Api.delete(`${endPoint}/${id}`).then(() => {
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
