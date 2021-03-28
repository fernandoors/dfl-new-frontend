import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  height: 100vh;

  .ant-layout {
    min-height: 100%;
  }
  
  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }

  .site-layout .site-layout-background {
    background: #fff;
    display: flex;
    justify-content: space-between;
  }
`

export const Image = styled.img`
  width: 140px;
  height: auto;
  margin: 25px;
  cursor: pointer;
  transition: 0.3s;
`