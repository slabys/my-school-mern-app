import * as React from 'react';
import { Route, Switch } from 'wouter';
import * as routes from 'Application/routes';
import { Landing } from 'Application/LandingPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPosts } from 'actions/posts';
import { Login, Register } from 'Application/SingUp';

export const Application: React.FunctionComponent = () => {
  return <RootRouter />;
};

const RootRouter: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts())
  },[dispatch])

  return (
    <Switch>
      <Route path={routes.LandingRoute.path}>
        <Landing />
      </Route>
      <Route path={routes.LoginRoute.path}>
        <Login />
      </Route>
      <Route path={routes.RegisterRoute.path}>
        <Register />
      </Route>
    </Switch>
  );
};

RootRouter.displayName = 'Application.RootRouter';
