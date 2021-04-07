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
  onFetchOrders(token: string): void;
  orders: any;
  token: string;
}

class Orders extends Component<IProps> {
  state = {
    loading: false,
    orders: []
  };

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
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
  auth: { token: string };
}) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchOrders: (token: string) => dispatch(actions.fetchOrders(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
