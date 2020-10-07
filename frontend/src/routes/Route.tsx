import React from 'react';

import { 
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect
} from 'react-router-dom';

import DefaultLayout from '../pages/_layouts/Default';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const RouteWrapper: React.FC<RouteProps> = ({
  component: Component,
  isPrivate = false,
  ...rest
}) => {
  const user = true;

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <DefaultLayout>
            <Component />
          </DefaultLayout>
        ) : (
          <Redirect to={{ 
            pathname: isPrivate ? '/error' : '/', 
            state: { from: location } 
          }} />
        )
      }}
    />
  )
}

export default RouteWrapper;