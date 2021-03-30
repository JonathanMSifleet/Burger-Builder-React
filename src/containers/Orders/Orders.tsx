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
  onFetchOrders(): void;
  orders: any;
}

class Orders extends Component<IProps> {
  state = {
    loading: false,
    orders: []
  };

  componentDidMount() {
    this.props.onFetchOrders();
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
  orders: { orders: any; loading: boolean };
}) => {
  return {
    loading: state.orders.loading,
    orders: state.orders.orders
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
