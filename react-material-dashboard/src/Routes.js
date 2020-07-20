import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  TarefasList as TarefaListView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Home as HomeView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <RouteWithLayout
        component={TarefaListView}
        // exact
        layout={MainLayout}
        path="/tarefas"
      />
      <RouteWithLayout
        component={HomeView}
        // exact
        layout={MainLayout}
        path="/home"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
