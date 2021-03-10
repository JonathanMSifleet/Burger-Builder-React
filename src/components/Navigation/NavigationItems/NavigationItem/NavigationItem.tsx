// @ts-ignore
import React from 'react';
import classes from './NavigationItem.module.css';

const navigationItem = (props: Props): JSX.Element => (
  <li className={classes.NavigationItem}>
    <a className={props.active ? classes.active : undefined} href={props.link}>
      {props.children}
    </a>
  </li>
);

type Props = {
  active?: boolean;
  link: string;
  children: any;
};

export default navigationItem;
