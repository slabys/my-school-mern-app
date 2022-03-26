import * as React from 'react';
import { Route, Switch } from 'wouter';
import * as routes from 'Application/routes';
import { Landing, PostPage } from 'LandingPage';

export const Application: React.FunctionComponent = () => {
  return <RootRouter />;
};

Application.displayName = 'Application';

const RootRouter: React.FunctionComponent = () => {
  return <Switch>
    <Route path={routes.LandingRoute.path}>
      <Landing />
    </Route>
    <Route path={routes.PostsRoute.path}>
      <PostPage />
    </Route>
  </Switch>;
};

RootRouter.displayName = 'Application.RootRouter';