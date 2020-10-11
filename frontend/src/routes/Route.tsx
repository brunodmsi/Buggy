import React from 'react';

import { 
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import DefaultLayout from '../pages/_layouts/Default';
import AuthLayout from '../pages/_layouts/Auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const RouteWrapper: React.FC<RouteProps> = ({
  component: Component,
  isPrivate = false,
  ...rest
}) => {
  const { user } = useAuth();

  if (!user && isPrivate)
    return <Redirect to="/login"/>

  if (user && !isPrivate)
    return <Redirect to="/"/>

  const Layout = user ? DefaultLayout : AuthLayout;

  return (
    <ReactDOMRoute
      {...rest}
      render={props => (
        <Layout>
          <Component />
        </Layout>
      )}
    />
  )
}

export default RouteWrapper;