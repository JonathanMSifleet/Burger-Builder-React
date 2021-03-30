import { IOrderData } from '../../containers/Checkout/ContactData/ContactData';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  orders: [] as IOrderData[],
  purchased: false
};

const reducer = (
  state = initialState,
  action: { type: string; orderData: IOrderData; orderId: string }
): any => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
