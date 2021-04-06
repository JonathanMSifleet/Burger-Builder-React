/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as actionTypes from './actionTypes';

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
  return (dispatch: any) => {
    dispatch(authStart());
  };
};
