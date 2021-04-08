// @ts-ignore
import React, { Component } from 'react';
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

class Orders extends Component<IProps> {
  state = {
    loading: false,
    orders: []
  };

  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render(): JSX.Element {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(
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
    return <div>{orders}</div>;
  }
}

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
)(withErrorHandler(Orders, axios));
