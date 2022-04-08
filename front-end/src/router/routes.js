import React from 'react';
import { About, Home, Login, Register } from '../components/pages/index';
import { HomeOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';

export const routes = [
  {
    key: '/home',
    menu: 'header',
    path: '/home',
    type: 'public',
    name: 'Inicio',
    icon: HomeOutlined,
    component: Home,
  },

  {
    key: '/about',
    menu: 'header',
    path: '/about',
    type: 'public',
    name: 'Nosotros',
    component: About,
  },
  {
    key: '/login',
    menu: 'header',
    path: '/login',
    type: 'auth',
    mode: 'public',
    name: 'Ingresar',
    icon: <LoginOutlined />,
    component: Login,
  },
  {
    key: '/register',
    menu: 'header',
    path: '/register',
    type: 'auth',
    mode: 'public',
    name: 'Registrarse',
    icon: <UserAddOutlined />,
    component: Register,
  },
  {
    key: '/logout',
    menu: 'header',
    path: '/logout',
    type: 'auth',
    mode: 'private',
    name: 'Salir',
    icon: <UserAddOutlined />,
  },

  { key: '/', path: '/', pathTo: '/home', redirect: true },
];
