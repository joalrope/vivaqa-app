import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { routes } from './routes';
import { NotFound } from '../components/pages';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          if (route.redirect) {
            return {/* <Redirect key={route.key} to={route.pathTo} />; */}
          }
          return <Route key={route.key} path={route.path} component={route.component} />;
        })}
      <Route component={NotFound} />;
    </Routes>
    </BrowserRouter>
  );
};
