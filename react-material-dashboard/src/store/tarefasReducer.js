import axios from 'axios';

import { mostrarMensagem } from './mensagensReducer';

const initialState = {
  tarefas: [],
  quantidade: 0
};

const Api = axios.create({
  baseURL: 'https://minhastarefas-api.herokuapp.com',
  headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
});

const ACTIONS = {
  LISTAR: 'TAREFAS_LISTAR',
  ADD: 'TAREFAS_ADD',
  REMOVER: 'TAREFAS_REMOVE',
  UPDATE_STATUS: 'TAREFA_UPDATE_STATUS'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LISTAR:
      return {
        ...state,
        tarefas: action.tarefas,
        quantidade: action.tarefas.length
      };
    case ACTIONS.ADD: {
      const lista = [...state.tarefas, action.tarefa];
      return { ...state, tarefas: lista, quantidade: lista.length };
    }
    case ACTIONS.REMOVER: {
      const { id } = action;
      const tarefas = state.tarefas.filter((tarefa) => tarefa.id !== id);
      return { ...state, tarefas, quantidade: tarefas.length };
    }
    case ACTIONS.UPDATE_STATUS: {
      const lista = [...state.tarefas];
      lista.forEach((tarefa) => {
        if (tarefa.id === action.id) {
          tarefa.done = true;
        }
      });
      return { ...state, tarefas: lista };
    }
    default:
      return state;
  }
};

export function listar() {
  return (dispatch) => {
    Api.get('tarefas').then((response) => {
      dispatch({
        type: ACTIONS.LISTAR,
        tarefas: response.data
      });
    });
  };
}

export function salvar(tarefa) {
  return async (dispatch) => {
    const response = await Api.post('tarefas', tarefa);
    dispatch([
      {
        type: ACTIONS.ADD,
        tarefa: response.data
      },
      mostrarMensagem('Tarefa salva com sucesso!')
    ]);
  };
}

export function deletar(id) {
  return (dispatch) => {
    Api.delete(`tarefas/${id}`).then(() => {
      dispatch([
        {
          type: ACTIONS.REMOVER,
          id
        },
        mostrarMensagem('Tarefa removida com sucesso!')
      ]);
    });
  };
}

export function alterarStatus(id) {
  return (dispatch) => {
    Api.patch(`tarefas/${id}`, null).then(() => {
      dispatch([
        {
          type: ACTIONS.UPDATE_STATUS,
          id
        },
        mostrarMensagem('Tarefa atualizada com sucesso!')
      ]);
    });
  };
}
