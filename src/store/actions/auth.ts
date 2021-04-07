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

export const auth = (
  email: string,
  password: string,
  isSignup: boolean
): any => {
  return async (
    dispatch: (arg0: {
      type: string;
      idToken?: string;
      userId?: string;
      error?: string;
    }) => void
  ) => {
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
      console.log('🚀 ~ file: auth.ts ~ line 64 ~ response', response);

      dispatch(authSuccess(response.data.idToken, response.data.localId));
    } catch (e) {
      console.log(e);
      dispatch(authFail(e));
    }
  };
};
