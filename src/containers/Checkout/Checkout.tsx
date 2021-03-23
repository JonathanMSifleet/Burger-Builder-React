// @ts-ignore
import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component<IProps> {
  state = {
    ingredients: {
      bacon: 1,
      cheese: 1,
      meat: 1,
      salad: 1
    }
  };

  componentDidMount(): void {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (const param of query.entries()) {
      // @ts-ignore
      ingredients[param[0]] = param[1];
    }
    this.setState({ ingredients });
  }

  checkoutCancelledHandler = (): void => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = (): void => {
    this.props.history.replace('/checkout/contact-data');
  };

  render(): JSX.Element {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          onCheckoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

interface IProps {
  history: any;
  location: any;
}

export default Checkout;
