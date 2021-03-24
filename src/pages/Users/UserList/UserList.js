import { Table } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../../service/api';
import { Container } from './UserList.style';

function UserList() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState({ current: 1, pagination: 1 })

  useEffect(() => {
    async function getUser() {
      const { data: content } = await api.get(`/v1/admin/users?page=${page.pagination}&limit=10&fields=phones`)
      const userConverted = content.data.map(user => ({
        ...user, key: user.id,
        phones: user.phones.map(phone => phone.number)
      }
      ))
      setUsers(userConverted)
      setPage(prev => ({ ...prev, total: content.pagination.total, pageSize: content.pagination.perPage }))
    }
    getUser()
  }, [page.pagination])

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

  return (
    <Container>
      <Table
        columns={columns}
        dataSource={users}
        loading={!users.length}
        pagination={page}
        onChange={pages => {
          setPage(prev => ({ ...prev, ...pages, pagination: pages.current }))
        }}
      >

      </Table>
    </Container >
  )
}

export default UserList