import { combineReducers } from 'redux';
import tarefasReducer from './tarefasReducer';
import mensagensReducer from './mensagensReducer';

const mainReducer = combineReducers({
  tarefas: tarefasReducer,
  mensagens: mensagensReducer
});

export default mainReducer;
