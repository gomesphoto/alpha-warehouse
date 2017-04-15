import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import ReduxThunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import ReduxReset from './libraries/redux-reset';
import reducers from './redux';
import Router from './Router';

const store = createStore(reducers,
  composeWithDevTools(applyMiddleware(ReduxThunk), ReduxReset())
);

const browserHistory = createBrowserHistory();

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Router browserHistory={browserHistory} />
    </BrowserRouter>
  </Provider>
);

export default Root;
