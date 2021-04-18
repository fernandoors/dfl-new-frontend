import { memo } from "react";
import {
  FaTv, FaMap, FaSitemap, FaBook, FaListAlt, FaMailBulk, FaDiagnoses, FaRegFileAlt,
  FaUserFriends, FaTruckLoading, FaSearchDollar, FaNetworkWired, FaCalendarCheck,
  FaClipboardList
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/auth";

export const links = [
  { permission: 'tickets', to: '/chamados', name: 'Chamados', icon: <FaSitemap />, },
  { permission: 'cargo', to: '/controle-de-cargas', name: 'Controle de Cargas', icon: <FaTruckLoading />, },
  { permission: 'rooms', to: '/sala-de-reuniao', name: 'Reserva da Sala de Reunião', icon: <FaCalendarCheck />, },
  { permission: 'crm', to: '/crm', name: 'CRM - Gestão de Clientes', icon: <FaDiagnoses />, },
  { permission: 'stock', to: '/controle-de-estoque', name: 'Controle de Estoque', icon: <FaClipboardList />, },
  { permission: 'inventory', to: '/inventario', name: 'Inventário de Patrimônio', icon: <FaBook />, },
  { permission: 'vouchers', to: '/vouchers-internet', name: 'Vouchers Internet', icon: <FaNetworkWired />, },
  { permission: 'promotion', to: '/promocao', name: 'Promoção', icon: <FaSearchDollar />, },
  { permission: 'cities', to: '/cidades-de-entrega', name: 'Cidades de Entrega', icon: <FaMap />, },
  { permission: 'receipt', to: '/comprovantes', name: 'Comprovantes', icon: <FaListAlt />, },
  { permission: 'tv', to: '/dfl-tv', name: 'DFL TV', icon: <FaTv />, },
  { permission: 'marketing', to: '/marketing', name: 'Marketing', icon: <FaMailBulk />, },
  { permission: 'nfe', to: '/consulta-st', name: 'Consulta ST por NFe/CTe', icon: <FaRegFileAlt />, },
  { permission: 'users', to: '/usuarios', name: 'Usuários', icon: <FaUserFriends />, },
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
  const { user } = useAuth();
  return (
    links
      .filter(link => user.permissions.includes(`read_${link.permission}`))
      .map(link => (
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