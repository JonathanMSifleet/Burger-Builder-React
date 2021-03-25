// @ts-ignore
import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

interface IProps {
  ingredients: { [type: string]: number };
  onCheckoutCancelled(): void;
  onCheckoutContinued(): void;
}

const checkoutSummary = (props: IProps): JSX.Element => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1> We hope it tastes good!</h1>
      <div className={classes.Box}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button buttonType="Danger" clicked={props.onCheckoutCancelled}>
        Cancel
      </Button>
      <Button buttonType="Success" clicked={props.onCheckoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
