import { useEffect, useState } from "react";
import { Button, Table, Input, Tag } from "antd";
import { Link } from "react-router-dom";
import api from "../../../service/api";
import addKeyToData from "../../../utils/addKeyToData";
import { statusArrayObject, statusContent, statusToColor } from "../../../utils/statusConvert";
import convertTableFilter from "../../../utils/convertTableFilter";
import * as S from "./TicketList.style";
import dayjs from "dayjs";
import Title from "../../../components/Title/Title";

const { Search } = Input;

function TicketList() {
  const [load, setLoad] = useState(true)
  const [departments, setDepartments] = useState([])
  const [ticketSearched, setTicketSearched] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState({ current: 1, pagination: 1, pageSize: 10 })

  useEffect(() => {
    async function getUser() {
      const { data: content } = await api.get(`/v1/admin/tickets?fields=comments`)
      const { data: departmentContent } = await api.get(`/v1/admin/departments?limit=1000`)
      const ticketConverted = content.data.map(addKeyToData)
      setDepartments(departmentContent.data.map(convertTableFilter))
      setTicketSearched(ticketConverted)
      setLoad(false)
      setPage(prev => ({ ...prev, total: content.pagination.total, }))
    }
    getUser()
  }, [])
  function handleChangePage(newPage) {
    setLoad(true)
    async function getTickets() {
      const { data: content } = await api.get(`/v1/admin/tickets?page=${newPage}&title=${search}&status=${statusFilter}`)
      const ticketConverted = content.data.map(addKeyToData)
      setTicketSearched(ticketConverted)
      setLoad(false)
      setPage(prev => ({ ...prev, total: content.pagination.total }))
    }
    getTickets()
  }
  function handleChangeStatus(status) {
    setLoad(true)
    async function getTickets() {
      const { data: content } = await api.get(`/v1/admin/tickets?status=${status}&title=${search}`)
      const ticketConverted = content.data.map(addKeyToData)
      setTicketSearched(ticketConverted)
      setLoad(false)
      setPage(prev => ({ ...prev, total: content.pagination.total }))
    }
    getTickets()
  }
  function handleSearch(name) {
    setLoad(true)
    async function getTickets() {
      const { data: content } = await api.get(`/v1/admin/tickets?title=${name}&status=${statusFilter}`)
      const ticketConverted = content.data.map(addKeyToData)
      setTicketSearched(ticketConverted)
      setLoad(false)
      setPage(prev => ({ ...prev, total: content.pagination.total }))
    }
    getTickets()
  }
  const columns = [
    {
      title: 'Departamento Resp.',
      dataIndex: 'department',
      key: 'department',
      filters: departments,
      onFilter: (value, record) => record.department.name.indexOf(value) === 0,
      render: department => <p>{department.name}</p>,
    },
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      render: (username, content) => <Link to={`/chamados/editar/${content.id}`}>{username}</Link>,
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      filterMultiple: false,
      filters: statusArrayObject,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: status => (
        <Tag color={statusToColor[status]}>
          {statusContent[status].toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Criado em',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: created_at => <p>{dayjs(created_at).format('DD-MM-YYYY')}</p>,
      sorter: (a, b) => dayjs(a.created_at).isBefore(dayjs(b.created_at)),
      showSorterTooltip: false,
    },
    {
      title: 'Criado por',
      dataIndex: 'user',
      key: 'user',
      render: user => <p>{user.name}</p>,
    },
  ];
  return (
    <S.Container>
      <Title title={'Chamados'} />
      <S.Container>
        <S.Row>
          <div>
            <Search
              allowClear
              value={search}
              onChange={event => setSearch(event.target.value)}
              onSearch={handleSearch}
              placeholder="Buscar Usuário"
              style={{ width: 200, marginBottom: 20 }}
            />
          </div>
          <div>
            <Link to='/chamados/editar/novo-ticket'>
              <Button>Criar Ticket</Button>
            </Link>
          </div>
        </S.Row>
        <Table
          columns={columns}
          dataSource={ticketSearched}
          loading={load}
          pagination={page}
          onChange={(pages, filter, changeSort) => {
            if (changeSort.order !== sort) {
              setSort(changeSort.order)
              return
            }
            if (page.pagination !== pages.current) {
              handleChangePage(pages.current)
              setPage(prev => ({ ...prev, ...pages, pagination: pages.current }))
            } else if (!!filter.status && statusFilter !== filter.status[0]) {
              setStatusFilter(filter.status[0])
              handleChangeStatus(filter.status[0])
            } else {
              setStatusFilter('')
              handleChangeStatus('')
            }
          }}
        />
      </S.Container >
    </S.Container>
  )
}

export default TicketList