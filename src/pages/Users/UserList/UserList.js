import { Input, Table } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../../service/api';
import { Container } from './UserList.style';
const { Search } = Input;

function UserList() {
  const [users, setUsers] = useState([])
  const [usersSearched, setUsersSearched] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState({ current: 1, pagination: 1 })

  useEffect(() => {
    async function getUser() {
      const { data: content } = await api.get(`/v1/admin/users?limit=5000&fields=phones`)
      const userConverted = content.data.map(user => ({
        ...user, key: user.id,
        phones: user.phones.map(phone => phone.number)
      }
      ))
      setUsersSearched(userConverted)
      setUsers(userConverted)
      setPage(prev => ({ ...prev, total: content.pagination.total, pageSize: 10 }))
    }
    getUser()
  }, [])

  const columns = [
    {
      title: 'Usuário',
      dataIndex: 'username',
      key: 'username',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      responsive: ['lg'],
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
    <Container>
      <Search
        allowClear
        value={search}
        onChange={handleSearch}
        placeholder="Buscar Usuário"
        style={{ width: 200, marginBottom: 20 }}
      />
      <Table
        columns={columns}
        dataSource={usersSearched}
        loading={!users.length}
        pagination={page}
        onChange={pages => {
          setPage(prev => ({ ...prev, ...pages, pagination: pages.current }))
        }}
      />
    </Container >
  )
}

export default UserList