import { Route, Redirect } from "react-router-dom";
import Base from "../components/Base/Base";
import { useAuth } from "../hooks/auth";


function PrivateRoute({ component, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      exact
      {...rest}
      render={({ location, ...props }) =>
        auth.user ? (
          <Base {...props} >{component}</Base>
        ) : (
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