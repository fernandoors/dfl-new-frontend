import { Input, Form, Button } from "antd"
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../../hooks/auth";
import * as S from "./Login.style"
import logo from '../../img/dfl_logo.png'
export default function Login() {

  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const { from } = location.state || { from: { pathname: "/protected" } };
  function handleLogin(value) {
    auth.signin(value, () => {
      history.replace(from);
    })
  }
  return (
    <S.Container>
      <S.Login>
        <S.Image src={logo} alt='Logo da empresa DFL, desenho de um caminhão com D F L escrito' />
        <Form name="basic" onFinish={handleLogin}>
          <Form.Item
            label="Usuário"
            name="username"
            rules={[{ required: true, message: 'Insira seu Usuário!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Insira sua Senha!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Login</Button>
          </Form.Item>
        </Form>
        {auth.loginFail &&
          <S.Descriptions>Verifique seu usuário e senha ou contate o administrador</S.Descriptions>
        }
      </S.Login>
    </S.Container>
  )
}