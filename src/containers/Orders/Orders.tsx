// @ts-ignore
import React, { Component } from 'react';
import Order from '../../components/Order/Order';

class Orders extends Component {
  render(): JSX.Element {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;
