import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './../utility';

interface IState {
  token?: string;
  userId?: string;
  error?: string;
  loading: boolean;
}

const initialState = {
  token: undefined,
  userId: undefined,
  error: undefined,
  loading: false
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

const authFail = (state: any, action: { error: string }) => {
  return updateObject(state, {
    error: action.error,
    loading: false
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
    default:
      return state;
  }
};

export default reducer;
