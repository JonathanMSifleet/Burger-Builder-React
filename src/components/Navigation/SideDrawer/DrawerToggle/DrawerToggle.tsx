// @ts-ignore
import React from 'react';
import classes from './DrawerToggle.module.css';

interface IProps {
  clicked(): void;
}

const drawerToggle = (props: IProps): JSX.Element => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
