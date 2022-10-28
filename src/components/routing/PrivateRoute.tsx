import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isAuthenticated = useTypedSelector(state => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props: any) =>
        !isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
