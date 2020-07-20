const initialState = {
  mensagem: '',
  mostrarMensagem: false
};

export const ACTIONS = {
  MOSTRAR_MENSAGEM: 'MENSAGENS_MOSTRAR',
  ESCONDER_MENSAGEM: 'MENSAGENS_ESCONDER'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.MOSTRAR_MENSAGEM:
      return { ...state, mensagem: action.mensagem, mostrarMensagem: true };
    case ACTIONS.ESCONDER_MENSAGEM:
      return { ...state, mensagem: '', mostrarMensagem: false };
    default:
      return state;
  }
};

export function mostrarMensagem(mensagem) {
  return {
    type: ACTIONS.MOSTRAR_MENSAGEM,
    mensagem
  };
}

export function esconderMensagem() {
  return {
    type: ACTIONS.ESCONDER_MENSAGEM
  };
}
