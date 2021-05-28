import { Card, Row } from "antd"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/auth";
import { links } from "../../routes/Links"
import * as S from "./Home.style"

export function Home() {
  const { user } = useAuth();
  return (
    <S.Container>
      <Row>
        {links
          .filter(link => user.permissions.includes(`read_${link.permission}`))
          .map(link => (
            <Link key={link.to} to={link.to}>
              <Card hoverable >
                {link.icon}
                <br />
                {link.name}
              </Card>
            </Link>
          ))}
      </Row>
    </S.Container>
  )
}