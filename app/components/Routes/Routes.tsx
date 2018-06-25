import React, { ComponentType, SFC } from 'react';
import { Route, Switch } from 'react-router-dom';

/**
 * @render react
 * @name Routes component
 * @description Routes component.
 * @example
 * <Routes
 *  routes={[
 *    {
 *      path: '/',
 *      component: Home,
 *    }
 *  ]}
 * />
 */

interface IRoute {
  path: string;
  component: ComponentType;
  routes?: IRoute[];
}

interface IProps {
  routes: IRoute[];
}

const RouteWithSubRoutes = (route: IRoute) => (
  <Route
    path={route.path}
    render={(props) => (
      // pass the sub-routes down to keep nesting
      <route.component routes={route.routes} {...props} />
    )}
  />
);

const Routes: SFC<IProps> = ({ routes }) => (
  <Switch>
    {routes.map((route: IRoute, index: number) => (
      <RouteWithSubRoutes key={index} {...route} />
    ))}
  </Switch>
);

export default Routes;
