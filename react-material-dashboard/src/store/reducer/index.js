import { combineReducers } from 'redux';
import mensagensReducer from './mensagensReducer';
import createCrudReducerWithNamedType from './defaultReducer';

const mainReducer = combineReducers({
  grupocomercial: createCrudReducerWithNamedType('grupocomercial'),
  mensagens: mensagensReducer
});

export default mainReducer;
