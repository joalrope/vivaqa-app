import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Col, Row, Space, Spin } from 'antd';
import { AntDesignOutlined, FacebookFilled, GithubOutlined, LinkedinFilled } from '@ant-design/icons';
import { startLogout } from '../actions/auth';
import { clearStore } from '../actions/ui';
import history from '../helpers/history';
import { AppRouter } from '../router/AppRouter';
import { routes } from '../router/routes';
import './app-layout.css';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Header, Footer, Content } = Layout;
const style = { fontSize: '18px', color: 'rgb(20, 0, 120)', verticalAlign: 'middle' };

export const AppLayout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn /* , checking */ } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.ui);
  const { pathname } = useLocation();

  const handleClick = ({ key }) => {
    if (key === '/logout') {
      dispatch(startLogout());
      clearStore(dispatch);
      history.push('/home');
    }
  };

  const mode = isLoggedIn ? 'private' : 'public';

  return (
    <Layout className='--main-layout__container'>
      <Layout className='--main-layout__right'>
        <Header>
          <div className='--layout-header__logo'>
            <div className='--app__logo'>Quiz App</div>
          </div>
          <Menu theme='dark' mode='horizontal' selectedKeys={[pathname]} onClick={handleClick}>
            {routes
              .filter((item) => (item.type === 'auth' && item.mode === mode) || item.type === mode)
              .map((route) =>
                route.scope === 'menu' ? (
                  <Menu.Item key={route.path}>
                    <Link to={route.path}>{route.name}</Link>
                  </Menu.Item>
                ) : (
                  <SubMenu key={route.key} title={route.name}>
                    {route.children.map((child) => (
                      <Menu.Item key={child.key}>
                        <Link to={child.path}>{child.name}</Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                )
              )}
          </Menu>
        </Header>

          {loading && (
            <div className='--layout-content__spinner'>
              <Spin /* indicator={loadingIcon}  */ size='large' />
            </div>
          )}
        <Content className='--layout-content__container'>
          <AppRouter />
        </Content>
        <Row>
          <Col xs={0} sm={24}>
            <Footer className='--layout-footer__container'>
              <Space align='baseline'>
                <div className='--layout-footer__info'>
                  {new Date().getFullYear()} -{'  '}
                  <a href='https://ant.design/' target='blank'>
                    <AntDesignOutlined style={style} />
                  </a>
                  {'  '}
                  Ant Design - App design and development by Joalrope{'  '}
                  <a href='https://www.facebook.com/Joalrope' target='blank'>
                    <FacebookFilled style={style} />
                  </a>
                  {'  '}
                  {'  '}
                  <a href='https://github.com/joalrope' target='blank'>
                    <GithubOutlined style={style} />
                  </a>
                  {'  '}
                  {'  '}
                  <a href='https://www.linkedin.com/in/joalrope/' target='blank'>
                    <LinkedinFilled style={style} />
                  </a>
                  {'  '}
                </div>
              </Space>
            </Footer>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};
