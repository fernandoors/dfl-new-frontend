
import { Switch, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import TicketCreate from "../pages/Tickets/TicketCreate/TicketCreate";
import TicketList from "../pages/Tickets/TicketList/TicketList";
import UserCreate from "../pages/Users/UserCreate/UserCreate";
import UserList from "../pages/Users/UserList/UserList";
import PrivateRoute from "./PrivateRoutes";

export default function Routes() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>

      <PrivateRoute exact path="/" component={<Home />} />

      <PrivateRoute exact component={<TicketList />} path='/chamados' />
      <PrivateRoute component={<TicketCreate />} path='/chamados/editar/:id' />
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
      <PrivateRoute exact component={<UserList />} path='/usuarios' />
      <PrivateRoute component={<UserCreate />} path='/usuarios/editar/:username' />
    </Switch>
  )
}