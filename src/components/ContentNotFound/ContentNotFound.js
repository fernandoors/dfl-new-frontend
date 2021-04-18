import { Alert } from "antd";
import { Link } from "react-router-dom";
import * as S from "./ContentNotFound.style"

export default function ContentNotFound({ link = '/', message = '', description = '' }) {

  return (
    <S.Container>
      <Link to={link}>
        <Alert
          showIcon
          type="error"
          style={{ textAlign: 'center' }}
          message={message}
          description={description}
        />
      </Link>
    </S.Container>
  )
}