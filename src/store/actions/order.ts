import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (
  id: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  orderData: any
): { type: string; orderId: string; orderData: any } => {
  return {
    orderData,
    orderId: id,
    type: actionTypes.PURCHASE_BURGER_SUCCESS
  };
};
export const purchaseBurgerFail = (
  error: string
): { type: string; error: string } => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = (): { type: string } => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const purchaseBurger = (orderData: any) => {
  return async (dispatch: (arg0: any) => void): Promise<void> => {
    dispatch(purchaseBurgerStart());
    try {
      const response = await axios.post('orders.json', orderData);
      dispatch(purchaseBurgerSuccess(response.data, orderData));
    } catch (e) {
      dispatch(purchaseBurgerFail(e));
    }
  };
};
