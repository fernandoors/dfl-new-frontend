
import { Switch, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import UserList from "../pages/Users/UserList/UserList";
import PrivateRoute from "./PrivateRoutes";

export default function Routes() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>

      <PrivateRoute exact path="/" component={<Home />} />
      
      <PrivateRoute component={<Home />} path='/chamados' />
      <PrivateRoute component={<Home />} path='/controle-de-cargas' />
      <PrivateRoute component={<Home />} path='/sala-de-reuniao' />
      <PrivateRoute component={<Home />} path='/crm' />
      <PrivateRoute component={<Home />} path='/controle-de-estoque' />
      <PrivateRoute component={<Home />} path='/inventario' />
      <PrivateRoute component={<Home />} path='/vouchers-internet' />
      <PrivateRoute component={<Home />} path='/promocao' />
      <PrivateRoute component={<Home />} path='/cidades-de-entrega' />
      <PrivateRoute component={<Home />} path='/comprovantes' />
      <PrivateRoute component={<Home />} path='/dfl-tv' />
      <PrivateRoute component={<Home />} path='/marketing' />
      <PrivateRoute component={<Home />} path='/consulta-st' />
      <PrivateRoute component={<UserList />} path='/usuarios' />
    
    </Switch>
  )
}