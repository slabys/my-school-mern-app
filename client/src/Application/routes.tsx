import React from 'react';
import * as LandingPage from 'LandingPage';

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

export const LandingRoute = new Route<EmptyParams, typeof  LandingPage.Landing>(LandingPage.Landing, '/', () => '/');

export const PostsRoute = new Route<EmptyParams, typeof  LandingPage.Landing>(LandingPage.Landing, '/posts', () => '/posts');
