import * as S from './Title.style'
export default function Title({ title = '' }) {
  return (
    <S.Container>{title}</S.Container>
  )
}