import { useContext, createContext, useState } from "react";
import api from "../service/api";

const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};
function useProvideAuth() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    if (!!token) {
      const { exp } = parseJwt(token)
      const tokenIsValid = (!!exp && Date.now() >= exp * 1000) ? null : { token }
      if (!tokenIsValid) {
        localStorage.setItem('token', '')
      }
      return tokenIsValid
    }
    return null
  });
  const [loginFail, setLoginFail] = useState(null)
  const useToken = user ? { headers: { Authorization: 'Bearer ' + user.token } } : ''
  const signin = async (login, cb) => {
    try {
      const { data: { token } } = await api.post('/v1/auth/login', login)
      const { data: userData } = await api.get('/v1/me', { headers: { Authorization: 'Bearer ' + token } })
      setUser({ token, ...userData })
      localStorage.setItem('token', token)
      cb()
    } catch (error) {
      setLoginFail(true)
    }
  }
  const signout = () => {
    return api.get('/v1/auth/logout', useToken).then(() => {
      localStorage.setItem('token', '')
      setUser(null);
    })
  };

  return {
    user,
    loginFail,
    signin,
    signout
  };
}

export default useProvideAuth