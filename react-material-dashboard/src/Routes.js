import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  GrupoComercial as GrupoComercialView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Home as HomeView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <RouteWithLayout
        component={GrupoComercialView}
        layout={MainLayout}
        path="/grupocomercial"
      />
      <RouteWithLayout component={HomeView} layout={MainLayout} path="/home" />
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
