import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import ReduxThunk from 'redux-thunk';
import ReduxReset from './libraries/redux-reset';
import reducers from './redux';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { getSessionStatus } from './helpers/utilities';

const store = createStore(reducers,
  composeWithDevTools(applyMiddleware(ReduxThunk), ReduxReset())
);

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/get-started" />} />
        <Route
          exact
          path="/:route"
          render={(routerProps) => {
            const path = routerProps.location.pathname;
            if (getSessionStatus() === 'LOGIN' && path !== '/logout') return (<Redirect to="/dashboard/home" />);
            if (getSessionStatus() === 'LOGOUT' && path !== '/logout') return (<Redirect to="/logout" />);
            return (<Login {...routerProps} />);
          }}
        />

        <Route
          exact
          path="/dashboard/:route"
          render={(routerProps) => {
            if (getSessionStatus() === 'LOGOUT') return (<Redirect to="/logout" />);
            return (<Dashboard {...routerProps} />);
          }}
        />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
