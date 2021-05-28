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
      render={({ location, ...props }) => {
        const state = { from: location }
        if (user && checkPermission(user.permissions, roles, path)) {
          return <Base {...props} >{component}</Base>
        }
        if (user) {
          return <Redirect to={{ pathname: '/', state }} />
        }
        return <Redirect to={{ pathname: "/login", state }} />
      }
      }
    />
  );
}
export default PrivateRoute