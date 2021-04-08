import axios from 'axios';
import * as actionTypes from './actionTypes';

export interface IAuthData {
  returnSecureToken: boolean;
  tenantId: string;
  token: string;
}

export const authStart = (): { type: string } => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (
  token: string,
  userId: string
): { type: string; idToken: string; userId: string } => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const authFail = (error: string): { type: string; error: string } => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const logout = (): { type: string } => {
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (dispatch: any): void => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (
  email: string,
  password: string,
  isSignup: boolean
): any => {
  return async (dispatch: any) => {
    dispatch(authStart());

    const apiKey = 'AIzaSyDvjZNwI1H5NsUPGNLRlt4bCameEpvcqVE';
    let url;

    if (isSignup) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    }

    try {
      const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
      });
      // console.log('Response:', response);

      const expiryDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      ).toString();

      localStorage.setItem('expirationDate', expiryDate);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (e) {
      dispatch(authFail(e.response.data.error));
    }
  };
};

export const setAuthRedirectPath = (
  path: string
): { path: string; type: string } => {
  return {
    path,
    type: actionTypes.SET_AUTH_REDIRECT_PATH
  };
};

export const authCheckState = () => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (dispatch: any): void => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = Date.parse(
        // @ts-expect-error false error
        localStorage.getItem('expirationDate')
      );

      if (expirationDate <= new Date().getTime()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('expirationDate') as string;
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expirationDate - new Date().getTime()));
      }
    }
  };
};
