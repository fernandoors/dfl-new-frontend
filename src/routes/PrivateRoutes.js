import { Route, Redirect } from "react-router-dom";
import Base from "../components/Base/Base";
import { useAuth } from "../hooks/auth";
import checkPermission from './utils/checkPermission'


function PrivateRoute({ component, roles, path, ...rest }) {
  const auth = useAuth();
  const user = auth.user
  return (
    <Route
      exact
      {...rest}
      render={({ location, ...props }) =>
        user && checkPermission(user.permissions, roles, path) ? (
          <Base {...props} >{component}</Base>
        ) : user ? <Redirect
          to={{
            pathname: "/",
            state: { from: location }
          }}
        /> : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute