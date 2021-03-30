import { IOrderData } from '../../containers/Checkout/ContactData/ContactData';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  orders: [] as IOrderData[]
};

const reducer = (
  state = initialState,
  action: { type: any; orderData: IOrderData; orderId: any }
): any => {
  switch (action.type) {
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
        orders: state.orders.concat(newOrder)
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
