/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

export const authSuccess = (authData: any): { type: string; authData: any } => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  };
};

export const authFail = (error: any): { type: string; error: any } => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

// @ts-ignore
export const auth = (email: string, password: string) => {
  const signupHandler = async (email: string, password: string) => {
    const apiKey = 'AIzaSyDvjZNwI1H5NsUPGNLRlt4bCameEpvcqVE';
    let response;
    try {
      response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        {
          email,
          password,
          returnSecureToken: true
        }
      );
      response = response.data;
    } catch (e) {
      response = e;
    } finally {
      return response;
    }
  };

  return async (dispatch: any) => {
    dispatch(authStart());

    const token = await signupHandler(email, password);
    console.log('token:', token);

    // const authData = {
    //   token: '',
    //   returnSecureToken: true
    // };
    // const userToken = await signupHandler(email, password);

    // try {
    //   const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`;
    //   const response = await axios.post(url, authData);
    //   console.log(response);
    //   dispatch(authSuccess(response.data));
    // } catch (e) {
    //   console.error(e);
    //   dispatch(authFail(e));
    // }
  };
};
