// @ts-ignore
import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

// could be a functional component
class OrderSummary extends Component<Props> {
  componentDidUpdate(): void {
    console.log('[OrderSummary] WillUpdate');
  }

  render(): JSX.Element {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingredientKey) => {
        return (
          <li key={ingredientKey}>
            <span style={{ textTransform: 'capitalize' }}>{ingredientKey}</span>
            : {this.props.ingredients[ingredientKey]}
          </li>
        );
      }
    );

    return (
      <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total price: {this.props.price}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button buttonType="Danger" clicked={this.props.purchaseCancelled}>
          Cancel
        </Button>
        <Button buttonType="Success" clicked={this.props.purchaseContinued}>
          Continue
        </Button>
      </Auxiliary>
    );
  }
}

type Props = {
  ingredients: {
    [type: string]: number;
  };
  price: string;
  purchaseCancelled(): void;
  purchaseContinued(): void;
};

export default OrderSummary;
