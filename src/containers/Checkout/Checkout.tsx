import React from 'react';
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

const checkout: React.FC<IProps> = ({ history, ings, purchased, match }) => {
  const checkoutCancelledHandler = (): void => {
    history.goBack();
  };

  const checkoutContinuedHandler = (): void => {
    history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;

  if (ings) {
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ings}
          onCheckoutCancelled={checkoutCancelledHandler}
          onCheckoutContinued={checkoutContinuedHandler}
        />
        <Route path={match.url + '/contact-data'} component={ContactData} />
      </div>
    );
  }

  return summary;
};

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

export default connect(mapStateToProps)(checkout);
