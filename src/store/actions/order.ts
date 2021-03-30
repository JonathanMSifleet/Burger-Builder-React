import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (
  id: string
): { type: string; orderId: string } => {
  return {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const purchaseBurgerStart = (orderData: any) => {
  return async (dispatch: (arg0: any) => void): Promise<void> => {
    try {
      const response = await axios.post('orders.json', orderData);
      dispatch(purchaseBurgerSuccess(response.data, orderData));
    } catch (e) {
      dispatch(purchaseBurgerFail(e));
    }
  };
};
