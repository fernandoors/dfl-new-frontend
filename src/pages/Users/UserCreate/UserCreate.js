import { Button, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ContentNotFound from "../../../components/ContentNotFound/ContentNotFound";
import Title from "../../../components/Title/Title";
import api from "../../../service/api";
import * as S from "./UserCreate.style"

function UserCreate() {
  const [user, setUser] = useState({})
  const [documents, setDocuments] = useState([])
  const [phones, setPhones] = useState([])
  const [address, setAddress] = useState({})

  const { username } = useParams();
  const notNew = username !== 'novo-usuario'
  useEffect(() => {
    if (username !== 'novo-usuario') {
      async function getUser() {
        const params = '&fields=address&fields=phones&fields=documents&fields=employee&fields=permissions&fields=roles'
        const { data: { data } } = await api.get(`/v1/admin/users?name=${username}${params}`)
        if (!data[0]) {
          setUser({ notFound: 'Usuário não encontrado' })
          return
        }
        const userContent = data[0]
        setUser(userContent)
        setDocuments(userContent.documents)
        setPhones(userContent.phones)
        setAddress(userContent.address)
      }
      getUser()
    }

  }, [username])
  if (!!user.notFound) {
    return (
      <ContentNotFound
        link='/usuarios'
        message="Usuário não encontrado"
        description="Verifique se o username está correto"
      />
    )
  }
  async function handleSaveUser() {
    console.log({ ...user, phones, address, documents })
    // await api('/v1/admin/users', {
    //   method: notNew ? 'PATCH' : 'POST',
    //   data: { ...user, phones, address, documents }
    // })
  }
  return (
    <S.Container>
      <Title title={notNew ? 'Editar Usuário' : 'Criar Usuário'} />
      <Tabs tabBarExtraContent={<Button onClick={handleSaveUser}>Salvar</Button>}>
        <Tabs.TabPane tab="Usuário" key="1">
          {JSON.stringify(user)}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Documentos" key="2">
          {JSON.stringify(documents)}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Telefones" key="3">
          {JSON.stringify(phones)}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Endereço" key="4">
          {JSON.stringify(address)}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Permissões" key="5">
          Content of tab 3
        </Tabs.TabPane>
      </Tabs>


    </S.Container>
  )
}

export default UserCreate