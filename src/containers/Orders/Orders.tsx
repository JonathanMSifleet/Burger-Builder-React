// @ts-ignore
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

interface IProps {
  loading: boolean;
  onFetchOrders(token: string, userId: string): void;
  orders: any;
  token: string;
  userId: string;
}

const orders: React.FC<IProps> = ({
  token,
  userId,
  loading,
  orders,
  onFetchOrders
}) => {
  useEffect(() => {
    onFetchOrders(token, userId);
  }, []);

  let ordersToDisplay = <Spinner />;
  if (!loading) {
    ordersToDisplay = orders.map(
      (order: {
        id: string;
        key: string;
        ingredients: { [type: string]: number };
        price: number;
      }) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      )
    );
  }
  return <div>{ordersToDisplay}</div>;
};

const mapStateToProps = (state: {
  order: { orders: any; loading: boolean };
  auth: { token: string; userId: string };
}) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchOrders: (token: string, userId: string) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(orders, axios));
