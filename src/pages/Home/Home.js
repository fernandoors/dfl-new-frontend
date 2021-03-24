import { Card, Row } from "antd"
import { Link } from "react-router-dom"
import { links } from "../../routes/Links"
import * as S from "./Home.style"

export function Home() {
  return (
    <S.Container>
      <Row>
        {links.map(link => (
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