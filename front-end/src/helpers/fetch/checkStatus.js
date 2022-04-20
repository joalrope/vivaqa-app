import { startLogout } from '../../actions/auth';
import { store } from '../../store/store';
import { showExpiredSessionMessage } from './showExpiredSessionMessage';

export const checkStatus = (status) => {
  console.log(messages(status));
  console.log(status);
  if (status === 401) {
    const previousUrl = window.location.pathname;
    sessionStorage.clear();
    store.dispatch(startLogout());
    showExpiredSessionMessage(previousUrl);
  }
  return {
    ok: false,
    msg: messages(status),
    result: {},
  };
  //}
  /* if (status === 404) {
    return {
      ok: false,
      msg: 'Recurso No encontrado',
      result: {},
    };
  }
  if (status === 500) {
    return {
      ok: false,
      msg: 'No hay coneccion con la Base de Datos',
      result: {},
    };
  }
  if (status === 501) {
    return {
      ok: false,
      msg: 'No hay coneccion con la Base de Datos',
      result: {},
    };
  } */
};

const messages = {
  401: 'unauthorized',
  404: 'Recurso No encontrado',
  500: 'No hay coneccion con la Base de Datos',
  501: 'No hay coneccion con la Base de Datos',
};
