
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

      <PrivateRoute roles={['read']} exact component={<TicketList />} path='/chamados' />
      <PrivateRoute roles={['create', 'update']} component={<TicketCreate />} path='/chamados/editar/:id' />
      <PrivateRoute roles={['read']} component={<Home />} path='/controle-de-cargas' />
      <PrivateRoute roles={['read']} component={<Home />} path='/sala-de-reuniao' />
      <PrivateRoute roles={['read']} component={<Home />} path='/crm' />
      <PrivateRoute roles={['read']} component={<Home />} path='/controle-de-estoque' />
      <PrivateRoute roles={['read']} component={<Home />} path='/inventario' />
      <PrivateRoute roles={['read']} component={<Home />} path='/vouchers-internet' />
      <PrivateRoute roles={['read']} component={<Home />} path='/promocao' />
      <PrivateRoute roles={['read']} component={<Home />} path='/cidades-de-entrega' />
      <PrivateRoute roles={['read']} component={<Home />} path='/comprovantes' />
      <PrivateRoute roles={['read']} component={<Home />} path='/dfl-tv' />
      <PrivateRoute roles={['read']} component={<Home />} path='/marketing' />
      <PrivateRoute roles={['read']} component={<Home />} path='/consulta-st' />
      <PrivateRoute roles={['read']} exact component={<UserList />} path='/usuarios' />
      <PrivateRoute roles={['create', 'update']} component={<UserCreate />} path='/usuarios/editar/:username' />
    </Switch>
  )
}