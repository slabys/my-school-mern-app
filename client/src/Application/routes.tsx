import React from 'react';
import * as LandingPage from 'Application/LandingPage';
import * as SingUp from 'Application/SingUp';

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

export const LoginRoute = new Route<EmptyParams, typeof SingUp.Login>(SingUp.Login, '/login', () => '/login');

export const RegisterRoute = new Route<EmptyParams, typeof SingUp.Register>(SingUp.Register, '/register', () => '/register');
