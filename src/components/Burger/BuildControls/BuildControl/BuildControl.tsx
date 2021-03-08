// @ts-ignore
import React from 'react';

import classes from './BuildControl.module.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const buildControl = (props: any): JSX.Element => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.Less}>Less</button>
    <button className={classes.More}>More</button>
  </div>
);

export default buildControl;
