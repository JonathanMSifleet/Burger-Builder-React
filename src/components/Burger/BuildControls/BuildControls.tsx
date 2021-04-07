// @ts-ignore
import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

interface IProps {
  ingredientAdded(type: string): void;
  ingredientRemoved(type: string): void;
  isAuth: boolean;
  price: number;
  purchasable: boolean;
  disabled: { [type: string]: any };
  ordered(): void;
}

const controls = [
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Salad', type: 'salad' }
];

const buildControls = (props: IProps): JSX.Element => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => (
        <BuildControl
          added={() => props.ingredientAdded(control.type)}
          disabled={props.disabled[control.type]}
          key={control.label}
          label={control.label}
          removed={() => props.ingredientRemoved(control.type)}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth ? 'ORDER NOW' : 'Sign up to order'}
      </button>
    </div>
  );
};

export default buildControls;
