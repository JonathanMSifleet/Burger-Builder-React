// @ts-ignore
import React from 'react';

import classes from './NavigationItem.module.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const navigationItem = (props: any): JSX.Element => (
  <li className={classes.NavigationItem}>
    <a className={props.active ? classes.active : undefined} href={props.link}>
      {props.children}
    </a>
  </li>
);

export default navigationItem;
