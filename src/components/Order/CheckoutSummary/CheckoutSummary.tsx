// @ts-ignore
import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props: Props): JSX.Element => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1> We hope it tastes good!</h1>
      <div className={classes.Box}>
        <Burger ingredients={props.ingredients} />
      </div>
      {/* @ts-ignore */}
      <Button buttonType="Danger" clicked>
        Cancel
      </Button>
      {/* @ts-ignore */}
      <Button buttonType="Success" clicked>
        Continue
      </Button>
    </div>
  );
};

type Props = {
  ingredients: { [type: string]: number };
};

export default checkoutSummary;
