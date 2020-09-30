import { combineReducers } from 'redux';
import mensagensReducer from './mensagensReducer';
import createCrudReducerWithNamedType from './defaultReducer';
import usuarioReducer from './usuarioReducer';

const mainReducer = combineReducers({
  grupocomercial: createCrudReducerWithNamedType('grupocomercial'),
  group: createCrudReducerWithNamedType('group'),
  usuario: usuarioReducer,
  mensagens: mensagensReducer,
  usermail: createCrudReducerWithNamedType('usermail')
});

export default mainReducer;
