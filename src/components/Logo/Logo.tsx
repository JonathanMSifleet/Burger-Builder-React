// @ts-ignore
import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const logo = (props: any): JSX.Element => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
