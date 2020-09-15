import { combineReducers } from 'redux';
import mensagensReducer from './mensagensReducer';
import createCrudReducerWithNamedType from './defaultReducer';

const mainReducer = combineReducers({
  grupocomercial: createCrudReducerWithNamedType('grupocomercial'),
  group: createCrudReducerWithNamedType('group'),
  usuario: createCrudReducerWithNamedType('usuario'),
  mensagens: mensagensReducer
});

export default mainReducer;
