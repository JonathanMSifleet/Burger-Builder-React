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

export const fetchOrdersSuccess = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  orders: any
): { type: string; orders: any } => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  };
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchOrdersFail = (error: any): { type: string; error: any } => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  };
};
export const fetchOrdersStart = (): { type: string } => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = () => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return async (dispatch: any): Promise<void> => {
    dispatch(fetchOrdersStart());

    try {
      const response = await axios.get('/orders.json');

      const fetchedOrders = [];
      for (const key in response.data) {
        fetchedOrders.push({ ...response.data[key], id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (e) {
      dispatch(fetchOrdersFail(e));
    }
  };
};
