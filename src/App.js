import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { Routes } from './routes';

// import NotFoundPage from './examples/NotFound';
// import ServerError from './examples/ServerError';

// components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import NotFoundPage from './pages/NotFound';
import ServerError from './pages/ServerError';
//deploy
import SignIn from './deploy/Signin';
import AddItem from './deploy/AddItem';
import Transactions from './deploy/Transactions';

import AuthService from './services/auth.service';

const App = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (!currentUser && user) {
      setCurrentUser(user);
    }
  }, []);
  const RouteWithLoader = ({ component: Component, ...rest }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <Route
        {...rest}
        render={props => (
          <>
          {currentUser && (window.location = '/dashboard')}
            <Preloader show={loaded ? false : true} /> <Component {...props} />
          </>
        )}
      />
    );
  };
  const RouteWithSidebar = ({ component: Component, ...rest }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <Route
        {...rest}
        render={props => (
          <>
            {!currentUser && (window.location = '/')}
            <Preloader show={loaded ? false : true} />
            <Sidebar />

            <main className="content">
              <Navbar />
              <Component {...props} />
            </main>
          </>
        )}
      />
    );
  };

  return (
    <>
      <Switch>
        <RouteWithLoader
          exact
          path={Routes.NotFound.path}
          component={NotFoundPage}
        />
        <RouteWithLoader
          exact
          path={Routes.ServerError.path}
          component={ServerError}
        />

        {/* deploy */}
        <RouteWithLoader exact path="/" component={SignIn} />
        <RouteWithSidebar
          exact
          path={Routes.Transactions.path}
          component={Transactions}
        />
        <RouteWithSidebar
          exact
          path={Routes.AddItem.path}
          component={AddItem}
        />
        <Redirect to={Routes.NotFound.path} />
      </Switch>
    </>
  );
};
export default App;
