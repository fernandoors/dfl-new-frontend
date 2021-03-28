import styled from 'styled-components'

export const Container = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #f8f8ff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const Image = styled.img`
  width: 220px;
  height: auto;
  margin: 50px 15px;
`
export const Login = styled.div`
  width: 320px;
  height: 450px;
  padding: 30px 20px;
  border-radius: 5px;
  border: 1px solid rgba(100,100,100,0.7);
  background-color: #e3eefd;
  .ant-form-item-label {
    width: 65px;
    margin-right: 2rem;
  }
`
export const Descriptions = styled.p`
  color: #ff0000;
  margin-top: 10px;
  text-align: center;
`