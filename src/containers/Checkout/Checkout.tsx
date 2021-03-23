// @ts-ignore
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component<IProps> {
  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0
    },
    totalPrice: 0
  };

  UNSAFE_componentWillMount(): void {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (const param of query.entries()) {
      if (param[0] === 'price') {
        // @ts-ignore
        price = param[1];
      } else {
        // @ts-ignore
        ingredients[param[0]] = param[1];
      }
    }
    this.setState({ ingredients, totalPrice: price });
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
        <Route
          path={this.props.match.url + '/contact-data'}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

interface IProps {
  history: any;
  location: any;
  match: any;
}

export default Checkout;
