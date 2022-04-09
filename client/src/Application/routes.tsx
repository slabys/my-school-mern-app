import React from 'react';
import * as LandingPage from 'Application/LandingPage';
import * as Account from 'Application/Account';

export interface EmptyParams {}

// const Link: React.FunctionComponent<
//   Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
//   children: React.ReactElement<'a'>;
//   to: string;
// }> = ({ children, to, ...props }) => {
//
//   return (
//     <Wouter.Link to={to} {...props}>
//       {children}
//     </Wouter.Link>
//   )
// };
//
// Link.displayName = 'Router.Link';

export class Route<LinkParams = EmptyParams, Target = React.FunctionComponent<any>> {
  // public Link: React.FunctionComponent<LinkParams & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { children: React.ReactElement<'a'>; }>;

  public Target: Target;

  public path: string;

  public createLink: (params: LinkParams) => string;

  public constructor(Target: Target, path: string, createLink: (params: LinkParams) => string) {
    // this.Link = (props) => <Link to={createLink(props)} {...props} />;
    // this.Link.displayName = 'Route.Link';

    this.path = path;

    this.Target = Target;

    this.createLink = createLink;
  }
}

export const LandingRoute = new Route<{ postId?: string; }, typeof LandingPage.Landing>(LandingPage.Landing, '/', ({postId = null}) => {
  const params = new URLSearchParams();

  if (postId !== null) {
    params.append('post', postId);
  }

  const query = params.toString();

  return `/${query !== '' ? `?${query}` : ''}`
});

export const AccountRoute = new Route<EmptyParams, typeof Account.Account>(Account.Account, '/account', () => '/account');
