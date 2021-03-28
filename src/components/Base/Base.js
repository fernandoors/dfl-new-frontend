import React, { memo } from 'react';
import { Dropdown, Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import * as S from "./Base.style"

import logo from '../../img/dfl_logo.png'
import Links from '../../routes/Links';
import { useAuth } from '../../hooks/auth';
import Avatar from 'antd/lib/avatar/avatar';

const { Header, Footer, Sider, Content } = Layout;

function Base({ children, ...props }) {
  const auth = useAuth();
  const [collapsed, setCollapsed] = React.useState(() => {
    return localStorage.getItem('collapsed') || false
  })
  return (
    <S.Container>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            setCollapsed(broken)
            localStorage.setItem('collapsed', broken)
          }}
        >
          <Link to='/' style={{ textDecoration: 'none' }}>
            <S.Image
              src={logo}
              style={collapsed ? { width: 70, margin: '10px 3px' } : {}}
              alt='Logo da empresa DFL, desenho de um caminhão com D F L escrito'
            />
          </Link>
          <Links />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(prev => !prev),
            })}
            <Dropdown
              overlay={(
                <Menu>
                  <Menu.Item key="0" onClick={auth.signout}>
                    Deslogar
                  </Menu.Item>
                </Menu>
              )}
              trigger={['click']}
            >
              {!!auth.user.image
                ? <S.Image
                  src={auth.user.image}
                  style={{ width: 32, height: 32, margin: 15, borderRadius: '50%' }}
                  alt='Sua foto - Ao Clicar, abre um menu inferior para deslogar da página'
                />
                : <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer', margin: 15 }} />
              }
            </Dropdown>
          </Header>
          <Content
            className="site-layout-background"
            style={{ margin: '24px 16px', padding: 24, minHeight: 280, }}
          >
            {React.cloneElement(children, { ...props })}
          </Content>

          <Footer style={{ textAlign: 'center' }}>©2021 DFL Transportes</Footer>
        </Layout>
      </Layout>
    </S.Container>
  )
}

export default memo(Base)