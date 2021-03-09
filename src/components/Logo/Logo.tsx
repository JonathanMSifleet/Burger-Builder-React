// @ts-ignore
import React from 'react';

import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/burger-logo.png';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const logo = (_props: any): JSX.Element => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
