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

const App = () => {
  const [currentUser, setcurrentUser] = useState('');
  console.log(currentUser);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setcurrentUser(user);
    }
    
  }, []);

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
