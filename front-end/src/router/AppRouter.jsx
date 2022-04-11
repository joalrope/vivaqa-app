import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routes } from './routes';
import { NotFound } from '../components/pages';

export const AppRouter = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const mode = isLoggedIn ? 'private' : 'public';

  return (
    <Switch>
      {routes
        .filter((item) => (item.type === 'auth' && item.mode === mode) || item.type === mode)
        .map((route) => {
          if (route.redirect) {
            return <Redirect key={route.key} to={route.pathTo} />;
          }
          return <Route key={route.key} path={route.path} component={route.component} />;
        })}
      <Route component={NotFound} />;
    </Switch>
  );
};
