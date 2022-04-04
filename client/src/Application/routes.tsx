import React from 'react';
import * as LandingPage from 'Application/LandingPage';
import * as Account from 'Application/Account';

export interface EmptyParams {}

export class Route<LinkParams = EmptyParams, Target = React.FunctionComponent<any>> {
  public Target: Target;

  public path: string;

  public createLink: (params: LinkParams) => string;

  public constructor(Target: Target, path: string, createLink: (params: LinkParams) => string) {
    this.path = path;

    this.Target = Target;

    this.createLink = createLink;
  }
}

export const LandingRoute = new Route<EmptyParams, typeof LandingPage.Landing>(LandingPage.Landing, '/', () => '/');

export const AccountRoute = new Route<EmptyParams, typeof Account.Account>(Account.Account, '/account', () => '/account');
