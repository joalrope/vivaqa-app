import { types } from '../types/types';
import { startLogout } from './auth';

export const clearStore = (dispatch) => {
  sessionStorage.clear();
  dispatch(startLogout());
};

export const loadingStart = () => ({
  type: types.authcheckingStart,
});

export const loadingFinish = () => ({
  type: types.authcheckingFinish,
});
