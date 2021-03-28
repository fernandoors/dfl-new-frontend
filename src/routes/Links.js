import { memo } from "react";
import {
  FaTv, FaMap, FaSitemap, FaBook, FaListAlt, FaMailBulk, FaDiagnoses, FaRegFileAlt,
  FaUserFriends, FaTruckLoading, FaSearchDollar, FaNetworkWired, FaCalendarCheck,
  FaClipboardList
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const links = [
  { to: '/chamados', name: 'Chamados', icon: <FaSitemap />, },
  { to: '/controle-de-cargas', name: 'Controle de Cargas', icon: <FaTruckLoading />, },
  { to: '/sala-de-reuniao', name: 'Reserva da Sala de Reunião', icon: <FaCalendarCheck />, },
  { to: '/crm', name: 'CRM - Gestão de Clientes', icon: <FaDiagnoses />, },
  { to: '/controle-de-estoque', name: 'Controle de Estoque', icon: <FaClipboardList />, },
  { to: '/inventario', name: 'Inventário de Patrimônio', icon: <FaBook />, },
  { to: '/vouchers-internet', name: 'Vouchers Internet', icon: <FaNetworkWired />, },
  { to: '/promocao', name: 'Promoção', icon: <FaSearchDollar />, },
  { to: '/cidades-de-entrega', name: 'Cidades de Entrega', icon: <FaMap />, },
  { to: '/comprovantes', name: 'Comprovantes', icon: <FaListAlt />, },
  { to: '/dfl-tv', name: 'DFL TV', icon: <FaTv />, },
  { to: '/marketing', name: 'Marketing', icon: <FaMailBulk />, },
  { to: '/consulta-st', name: 'Consulta ST por NFe/CTe', icon: <FaRegFileAlt />, },
  { to: '/usuarios', name: 'Usuários', icon: <FaUserFriends />, },
]
const Container = styled.main`
  font-size: .8em;
  padding: 10px;
  svg {
    margin-right: 1.2rem;
  }
  &:hover {
    color: #1890ff;
    background-color: #FFFFFF;
    margin-left: 5px;
    transition: 0.3s;
  }
`
function Links() {
  return (
    links.map(link => (
      <NavLink
        to={link.to}
        key={link.to}
        className='nav-link'
        activeStyle={{ fontWeight: "700", color: '#ff7600' }}
        style={{ color: '#FFFFFF' }}
      >
        <Container>{link.icon} {link.name}</Container>
      </NavLink>
    ))
  )
}

export default memo(Links)