import { Button, Card, Input, Select, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ShowingComponent from "../../../components/Showing/ShowingComponent";
import Title from "../../../components/Title/Title";
import api from "../../../service/api";
import sortByIdDesc from "../../../utils/sortByIdDesc";
import { statusArrayObject } from "../../../utils/statusConvert";
import * as S from "./TicketCreate.style"
function TicketCreate() {
  const [ticket, setTicket] = useState({})
  const [departments, setDepartments] = useState([])
  const [load, setLoad] = useState(true)
  const { id } = useParams();
  useEffect(() => {
    async function getDepartment() {
      const { data: departmentContent } = await api.get(`/v1/admin/departments?limit=1000`)
      setDepartments(departmentContent.data)
    }
    if (id !== 'novo-ticket') {
      async function getTicket() {
        const { data: content } = await api.get(`/v1/admin/tickets/${id}?fields=comments`)
        setTicket(content)
      }
      setLoad(false)
      getTicket()
    } else {
      setLoad(false)
    }
    getDepartment()
  }, [id])
  function handleContentEdit(event) {
    setTicket(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }
  function handleCommentCreate(event) {
    setTicket(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }
  function handleSelectedStatus(status) {
    setTicket(prev => ({ ...prev, status }))
  }
  function handleSelectedDepartment(department_id) {
    setTicket(prev => ({ ...prev, department_id }))
  }
  function handleSubmit(event) {
    event.preventDefault()
  }
  if (load) {
    return <Spin size='large' />
  }
  const notNew = id !== 'novo-ticket'
  return (
    <S.Container>
      <Title title={notNew ? 'Editar Chamado' : 'Criar Chamado'} />
      <main>
        <Card title={notNew ? 'Título: ' + ticket.title : 'Ticket'} extra={<Button type="primary">{notNew ? 'Salvar' : 'Criar'}</Button>}>
          <form onSubmit={handleSubmit}>
            <ShowingComponent show={notNew}>
              <S.Row row='space-between'>
                <S.Row margin={'0px'}>
                  <label htmlFor="status">Status:</label>
                  <Select
                    disabled={['cancelled', 'closed'].includes(ticket.disabled)}
                    value={ticket.status} onSelect={handleSelectedStatus} name="status"
                  >
                    {statusArrayObject.map(status => (
                      <Select.Option key={status.key} >{status.text}</Select.Option>
                    ))}
                  </Select>
                </S.Row>
                <p><strong style={{ marginRight: 10 }}>Criado por:</strong>{ticket?.user?.name}</p>
              </S.Row>
            </ShowingComponent>
            <ShowingComponent show={!notNew}>
              <S.Row>
                <label htmlFor="title">Título:</label>
                <Input disabled={notNew} style={{ width: 300 }} type="text" name="title" onChange={handleContentEdit} value={ticket.title || ''} />
              </S.Row>
            </ShowingComponent>
            <S.Row>
              <label htmlFor="description">Descrição:</label>
              <Input.TextArea disabled={notNew} style={{ width: '80%' }} type="text" name="description" onChange={handleContentEdit} value={ticket.description || ''} />
            </S.Row>
            <S.Row row='space-between' margin='0'>
              <S.Row>
                <label htmlFor="status">Departamento:</label>
                {departments.length &&
                  <Select value={ticket.department_id} onSelect={handleSelectedDepartment} name="department">
                    {departments.map(department => (
                      <Select.Option key={department.id} value={department.id} >{department.name}</Select.Option>
                    ))}
                  </Select>
                }
              </S.Row>

            </S.Row>
          </form>
        </Card>
        <ShowingComponent show={notNew}>
          <S.Cards>
            <Card hoverable title='Atualizações'>
              <Card title={'Novo Comentário'} extra={<Button type="primary">Salvar</Button>}>
                <S.Row row='center'>
                  <Input.TextArea style={{ minHeight: 300 }} type="text" name="newComment" onChange={handleCommentCreate} value={ticket.newComment || ''} />
                </S.Row>
              </Card>
              {ticket.comments && (
                ticket.comments.length && ticket.comments.sort(sortByIdDesc).map(comment => (
                  <Card
                    title={comment.user.name} key={comment.id}
                  // extra={<Button type="primary">Salvar</Button>}
                  >
                    <p>Criado em: {dayjs(comment.created_at).format('DD-MM-YYYY')}</p>
                    <S.Row row='center'>
                      <Input.TextArea disabled value={comment.description || ''} />
                    </S.Row>
                  </Card>
                )))}
            </Card>
          </S.Cards>
        </ShowingComponent>
      </main>
    </S.Container>
  )
}

export default TicketCreate