import { combineReducers } from 'redux';
import tarefasReducer from './tarefasReducer';
import mensagensReducer from './mensagensReducer';
import createCrudReducerWithNamedType from './defaultReducer';

const mainReducer = combineReducers({
  tarefas2: createCrudReducerWithNamedType('tarefas2'),
  tarefas: tarefasReducer,
  mensagens: mensagensReducer
});

export default mainReducer;
