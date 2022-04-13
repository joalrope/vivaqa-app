import { Modal } from 'antd';
import { store } from '../store/store';
import { startLogout } from '../actions/auth';
import history from './history';
import { loadingFinish, loadingStart } from '../actions/ui';

const baseUrl = process.env.REACT_APP_API_URL;
let response;

export const fetchWithoutToken = (endpoint, data, method = 'GET') => {
  return async (dispatch) => {
    const url = `${baseUrl}${endpoint}`;
    dispatch(loadingStart());

    if (method === 'GET') {
      response = fetch(url)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            return {
              ok: false,
            };
          }
        })
        .then((data) => {
          dispatch(loadingFinish());
          return data;
        })
        .catch((e) => {
          dispatch(loadingFinish());
          return catchError(e);
        });
    } else {
      response = fetch(url, {
        method,
        headers: {
          'content-type': 'application/json',
          'x-role': 'basic',
        },
        body: JSON.stringify(data),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            return {
              ok: false,
            };
          }
        })
        .then((data) => {
          dispatch(loadingFinish());
          return data;
        })
        .catch((e) => {
          dispatch(loadingFinish());
          return catchError(e);
        });
    }

    return response;
  };
};

export const fetchWithToken = (endpoint, data, method = 'GET', header) => {
  return async (dispatch) => {
    const url = `${baseUrl}${endpoint}`;
    dispatch(loadingStart());
    const token = sessionStorage.token;
    const getHeaders = { 'x-token': token, ...header };
    const postHeaders = {
      'content-type': 'application/json',
      'x-token': token,
      ...header,
    };

    if (method === 'GET') {
      response = fetch(url, {
        method,
        headers: getHeaders,
        //signal: setTimeout(50).signal,
      })
        .then((resp) => {
          checkSessionStatus(resp.status);
          if (resp.ok) {
            return resp.json();
          } else {
            return {
              ok: false,
              msg: 'No se pudo obtener el recurso',
              result: {},
            };
          }
        })
        .then((data) => {
          dispatch(loadingFinish());
          return data;
        })
        .catch((e) => {
          dispatch(loadingFinish());
          return catchError(e);
        });
    } else {
      response = fetch(url, {
        method,
        headers: postHeaders,
        //signal: setTimeout(50).signal,
        body: JSON.stringify(data),
      })
        .then((resp) => {
          checkSessionStatus(resp.status);
          if (resp.ok) {
            return resp.json();
          } else {
            return {
              ok: false,
              msg: 'No se pudo crear el recurso',
              result: {},
            };
          }
        })
        .then((data) => {
          dispatch(loadingFinish());
          return data;
        })
        .catch((e) => {
          dispatch(loadingFinish());
          return catchError(e);
        });
    }

    return response;
  };
};

/* const setTimeout = (time) => {
  let controller = new AbortController();
  setTimeout(() => controller.abort(), time * 1000);
  return controller;
}; */

const catchError = (error) => {
  return {
    ok: false,
    msg: 'La solicitud fue rechazada. Parece que no hay conección de Internet',
    result: error,
  };
};

const checkSessionStatus = (status) => {
  if (status === 401) {
    const previousUrl = window.location.pathname;
    sessionStorage.clear();
    store.dispatch(startLogout());
    showExpiredSessionMessage(previousUrl);

    return {
      ok: false,
      msg: 'unauthorized',
      result: {},
    };
  }
  if (status === 404) {
    return {
      ok: false,
      msg: 'Recurso No encontrado',
      result: {},
    };
  }
};

const showExpiredSessionMessage = (url) => {
  Modal.info({
    title: 'Sesión de usuario',
    content: ['Su sesión activa ha expirado. Por favor inicie una nueva'],
    okText: 'Aceptar',
    okType: 'primary',
    confirmLoading: true,
    autoFocusButton: null,
    onOk() {
      history.replace(url);
      history.push('/home');
      history.push('/login');
    },
  });
};

/* return fetch(
  `${endpoint}/users?${serializeQuery({
    per_page: meta.pageSize,
    page: meta.page - 1,
  })}`
) */

export function serializeQuery(query) {
  return Object.keys(query)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&');
}
