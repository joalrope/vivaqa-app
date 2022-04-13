import { types } from '../types/types';
import { parseJwt } from '../helpers/parse-jwt';

const { uid, name } = parseJwt();
const isLoggedIn = uid && name ? true : false;

const initialState = {
  uid: uid || null,
  name: name || null,
  isLoggedIn,
  /*  checking: false, */
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authlogin:
      return {
        ...state,
        ...action.payload,
      };

    /* case types.authcheckingStart:
      return {
        ...state,
        checking: true,
      };

    case types.authcheckingFinish:
      return {
        ...state,
        checking: false,
      }; */

    case types.authlogout:
      return {
        ...state,
        checking: false,
        uid: null,
        name: null,
        isLoggedIn: false,
      };

    case types.authShowLogin:
      return {
        ...state,
        loginVisible: action.payload,
      };

    case types.authShowRegister:
      return {
        ...state,
        RegisterVisible: action.payload,
      };

    case types.authShowPassForgot:
      return {
        ...state,
        PassForgotVisible: action.payload,
      };

    default:
      return state;
  }
};
