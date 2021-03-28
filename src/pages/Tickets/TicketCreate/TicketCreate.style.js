import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  padding: 10px;
  .ant-select {
    width: 200px;
  }
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${({ row }) => row || 'flex-start'};
  margin: ${({ margin }) => margin || '20px'};
  > label {
    display: block;
    width: 100px;
  }
  .ant-btn {
    margin-left: 10px;
  }
`

export const Cards = styled.div`
  margin-top: 20px;
  .ant-card + .ant-card {
    margin-top: 20px;
  }
`