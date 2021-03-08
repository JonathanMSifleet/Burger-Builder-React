// @ts-ignore
import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const orderSummary = (props: any): JSX.Element => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    (ingredientKey) => {
      return (
        <li key={ingredientKey}>
          <span style={{ textTransform: 'capitalize' }}>{ingredientKey}</span>:{' '}
          {props.ingredients[ingredientKey]}
        </li>
      );
    }
  );
  <li>Salad: 1</li>;
  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout?</p>
    </Auxiliary>
  );
};

export default orderSummary;
