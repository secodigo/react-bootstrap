// export { default } from './TarefasList';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TarefasList from './TarefasList';
import { TarefasToolbar } from './components';

function index({ match }) {
  return (
    <Switch>
      <Route exact path={`${match.path}/`} component={TarefasList} />
      <Route exact path={`${match.path}/create`} component={TarefasToolbar} />
      <Route
        exact
        path={`${match.path}/create/:id?`}
        component={TarefasToolbar}
      />
    </Switch>
  );
}

export default index;
