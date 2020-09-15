import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Create, List } from './components';

function index({ match }) {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={`${path}/`} component={List} />
      <Route exact path={`${path}/create`} component={Create} />
      <Route exact path={`${path}/create/:id?`} component={Create} />
    </Switch>
  );
}

export default index;
