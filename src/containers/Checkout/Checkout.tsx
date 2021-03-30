// @ts-ignore
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

interface IProps {
  history: any;
  ings: { [type: string]: number };
  onInitPurchase(): void;
  match: {
    url: string;
  };
  purchased: boolean;
}

class Checkout extends Component<IProps> {
  checkoutCancelledHandler = (): void => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = (): void => {
    this.props.history.replace('/checkout/contact-data');
  };

  render(): JSX.Element {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutCancelled={this.checkoutCancelledHandler}
            onCheckoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.url + '/contact-data'}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = (state: {
  burgerBuilder: {
    ingredients: { [type: string]: number };
    totalPrice: number;
  };
  order: { purchased: boolean };
}) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
