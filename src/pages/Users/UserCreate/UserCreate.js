import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Title from "../../../components/Title/Title";
import api from "../../../service/api";
import * as S from "./UserCreate.style"

function UserCreate() {
  const [user, setUser] = useState({})
  const { username } = useParams();

  useEffect(() => {
    if (username !== 'novo-usuario') {
      async function getUser() {
        const params = '&fields=address&fields=phones&fields=documents&fields=employee'
        const { data } = await api.get(`/v1/admin/users?name=${username}${params}`)
        console.log(data)
        setUser(data)
      }
      getUser()
    }

  }, [username])

  const notNew = username !== 'novo-usuario'
  return (
    <S.Container>
      <Title title={notNew ? 'Editar Usuário' : 'Criar Usuário'} />
      {JSON.stringify(user)}
    </S.Container>
  )
}

export default UserCreate