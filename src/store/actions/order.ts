import axios from '../../axios-orders';
import { IOrderData } from '../../containers/Checkout/ContactData/ContactData';
import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (
  id: string,
  orderData: IOrderData
): { type: string; orderId: string; orderData: IOrderData } => {
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

export const purchaseBurger = (orderData: IOrderData) => {
  return async (dispatch: (arg0: any) => void): Promise<void> => {
    dispatch(purchaseBurgerStart());
    try {
      const response = await axios.post('orders.json', orderData);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    } catch (e) {
      dispatch(purchaseBurgerFail(e));
    }
  };
};

export const purchaseInit = (): { type: string } => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};
