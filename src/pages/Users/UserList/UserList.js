import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Table } from 'antd';
import api from '../../../service/api';
import * as S from './UserList.style';
import addKeyToData from '../../../utils/addKeyToData';
import Title from '../../../components/Title/Title';
const { Search } = Input;

function UserList() {
  const [users, setUsers] = useState([])
  const [usersSearched, setUsersSearched] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState({ current: 1, pagination: 1, pageSize: 10 })

  useEffect(() => {
    async function getUser() {
      const { data: content } = await api.get(`/v1/admin/users?limit=5000&fields=phones`)
      const userConverted = content.data.map(user => ({
        ...addKeyToData(user), phones: user.phones.map(phone => phone.number)
      }
      ))
      setUsersSearched(userConverted)
      setUsers(userConverted)
      setPage(prev => ({ ...prev, total: content.pagination.total, }))
    }
    getUser()
  }, [])

  const columns = [
    {
      title: 'Usuário',
      dataIndex: 'username',
      key: 'username',
      defaultSortOrder: 'ascend',
      showSorterTooltip: false,
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: username => <Link to={`/usuarios/editar/${username}`}>{username}</Link>,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      responsive: ['lg'],
      showSorterTooltip: false,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Telefone(s)',
      dataIndex: 'phones',
      key: 'phones',
      render: phones => (
        phones.map(phone => <p key={phone}>{phone}</p>)
      ),
      responsive: ['md'],
    },
  ];
  function handleSearch({ target }) {
    const text = target.value
    setSearch(text)
    const usersFound = users.filter(({ name, username }) => name.toLowerCase().includes(text) || username.toLowerCase().includes(text))
    setUsersSearched(usersFound)
    setPage(prev => ({ ...prev, total: usersFound.length }))
  }
  return (
    <S.Container>
      <Title title={'Usuários'} />
      <S.Row>
        <div>
          <Search
            allowClear
            value={search}
            onChange={handleSearch}
            placeholder="Buscar Usuário"
            style={{ width: 200, marginBottom: 20 }}
          />
        </div>
        <div>
          <Link to='/usuarios/editar/novo-usuario'>
            <Button>
              Criar Usuário
            </Button>
          </Link>
        </div>
      </S.Row>
      <Table
        columns={columns}
        dataSource={usersSearched}
        loading={!users.length}
        pagination={page}
        onChange={pages => {
          setPage(prev => ({ ...prev, ...pages, pagination: pages.current }))
        }}
      />
    </S.Container >
  )
}

export default UserList