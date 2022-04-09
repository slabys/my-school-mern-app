import * as React from 'react';

export const useSearchParams = (): URLSearchParams => {
  const [[, params], setSearchParams] = React.useState([window.location.search, new URLSearchParams(window.location.search)]);
  const update = React.useCallback(() => {
    setSearchParams((state) => (state[0] === window.location.search ? state : [window.location.search, new URLSearchParams(window.location.search)]));
  }, []);

  React.useEffect(() => {
    const events = ['popstate', 'pushState', 'replaceState']; // Events pushState and replaceState are provided by wouter
    events.forEach((event) => {
      window.addEventListener(event, update);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, update);
      });
    };
  }, []);

  return params;
};
