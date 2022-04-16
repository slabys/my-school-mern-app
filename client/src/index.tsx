import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Application } from './Application';
import reducers from './reducers'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Application />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('application'),
);
