import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './../utility';

interface IState {
  authRedirectPath: string;
  error?: string;
  loading: boolean;
  token?: string;
  userId?: string;
}

const initialState = {
  authRedirectPath: '/',
  error: (null as unknown) as string,
  loading: false,
  token: (null as unknown) as string,
  userId: (null as unknown) as string
} as IState;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authStart = (state: any, _action: any) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (
  state: any,
  action: { idToken: string; userId: string }
) => {
  return updateObject(state, {
    error: null,
    loading: false,
    token: action.idToken,
    userId: action.userId
  });
};

const authFail = (state: IState, action: { error: string }) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authLogout = (state: IState, _action: any) => {
  return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state: IState, action: { path: string }) => {
  return updateObject(state, {
    authRedirectPath: action.path
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const reducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
