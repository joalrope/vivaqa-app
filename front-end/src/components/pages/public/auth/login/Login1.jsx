import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import { startLogin } from '../../../../../actions/auth';
import history from '../../../../../helpers/history';
import './login.scss';

export const Login = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [remember, setRemember] = useState(false);
  const [cookies, setCookie] = useCookies(['email', 'password']);

  const onFinish = ({ email, password }) => {
    dispatch(startLogin(email, password));

    if (remember) {
      setCookie('email', email, { path: '/' });
      setCookie('Password', password, { path: '/' });
    }
    form.resetFields();
    history.push('/quizzes');
  };

  const onChangeRemember = () => {
    setRemember(!remember);
  };

  const handleShowRegister = () => {
    history.push('/register');
  };

  return (
    <>
      <div className='--login-page__body'></div>
      <div className='--login-page__container'>
        <Row justify='center'>
          <Col>
            <div className='--login-form__container'>
              <Form
                name='normal_login'
                form={form}
                className='--login-form'
                initialValues={{ email: cookies.email, password: cookies.password, remember: { remember } }}
                autoComplete='off'
                onFinish={onFinish}
              >
                <h2 className='--login-form__title'>Iniciar Sesión</h2>
                <Form.Item
                  name='email'
                  autoComplete='off'
                  rules={[{ required: true, message: 'Por Favor ingrese su dirección de correo!' }]}
                >
                  <Input
                    prefix={<MailOutlined className='site-form-item-icon' />}
                    autoComplete='new-email'
                    placeholder='Correo'
                  />
                </Form.Item>
                <Form.Item
                  name='password'
                  autoComplete='off'
                  rules={[{ required: true, message: 'Por Favor ingrese la contraseña!' }]}
                >
                  <Input
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    autoComplete='new-password'
                    placeholder='Contraseña'
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name='remember' valuePropName={remember ? 'checked' : 'unChecked'} noStyle>
                    <Checkbox className='--remember-check' onChange={onChangeRemember}>
                      Recordarme
                    </Checkbox>
                  </Form.Item>
                </Form.Item>

                <Form.Item>
                  <Button type='primary' htmlType='submit' className='login-form-button'>
                    Ingresar
                  </Button>
                  <div className='--register-goto__text' onClick={handleShowRegister}>
                    No tiene cuenta?
                    <Link className='--register-goto__link' to='/register'>
                      Registrese!
                    </Link>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
