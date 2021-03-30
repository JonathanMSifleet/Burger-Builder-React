// @ts-ignore
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

interface IProps {
  history: any;
  ings: { [type: string]: number };
  location: any;
  match: any;
}

interface IState {
  ingredients: { [type: string]: number };
  totalPrice: number;
}

class Checkout extends Component<IProps, IState> {
  checkoutCancelledHandler = (): void => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = (): void => {
    this.props.history.replace('/checkout/contact-data');
  };

  render(): JSX.Element {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      summary = (
        <div>
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

const mapStateToProps = (state: IState) => {
  return {
    ings: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
