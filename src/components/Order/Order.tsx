// @ts-ignore
import React from 'react';
import classes from './Order.module.css';

interface IProps {
  ingredients: { [type: string]: number };
  price: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const order = (props: IProps): JSX.Element => {
  const ingredients = [];

  for (const ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map((ingredient) => {
    return (
      <span className={classes.span} key={ingredient.name}>
        {ingredient.name} ({ingredient.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingeredients: {ingredientOutput}</p>
      <p>
        Price: <strong> {props.price.toFixed(2)} GBP </strong>
      </p>
    </div>
  );
};

export default order;
