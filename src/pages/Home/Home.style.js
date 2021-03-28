import styled from 'styled-components'

export const Container = styled.section`
  .ant-card {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 160px;
    height: 100px;
    margin: 10px;
    text-align: center;
  }
  .ant-card:hover {
    color: #1890ff;
    transition: color 0.3s;
  }
  svg {
    font-size: 1.8rem;
  }
  .ant-row {
    @media (max-width: 440px) {
      justify-content: center;
    }
  }
`