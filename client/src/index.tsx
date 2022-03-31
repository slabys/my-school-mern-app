import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { Application } from './Application';
import reducers from './reducers'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Application />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('application'),
);
