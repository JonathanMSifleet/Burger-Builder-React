// @ts-ignore
import React from 'react';
import classes from './DrawerToggle.module.css';

const drawerToggle = (props: Props): JSX.Element => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

type Props = {
  clicked(): void;
};

export default drawerToggle;
