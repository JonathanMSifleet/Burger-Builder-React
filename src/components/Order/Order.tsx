// @ts-ignore
import React from 'react';
import classes from './Order.module.css';

const order = (): JSX.Element => (
  <div className={classes.Order}>
    <p>Ingeredients: Salad (1)</p>
    <p>
      Price: <strong> 5.45 GBP </strong>
    </p>
  </div>
);

export default order;
