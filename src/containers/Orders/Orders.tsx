// @ts-ignore
import React, { Component } from 'react';
import axios from '../../axios-orders';
import {
  default as order,
  default as Order
} from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: false
  };

  async componentDidMount(): Promise<void> {
    try {
      const response = await axios.get('/orders.json');

      const fetchedOrders = [];
      for (const key in response.data) {
        fetchedOrders.push({ ...response.data[key], id: key });
      }
      this.setState({ loading: false, orders: fetchedOrders });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  render(): JSX.Element {
    return (
      <div>
        {this.state.orders.map((order: order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
}

type order = {
  id: string;
  key: string;
  ingredients: { [type: string]: number };
  price: number;
};

export default withErrorHandler(Orders, axios);
