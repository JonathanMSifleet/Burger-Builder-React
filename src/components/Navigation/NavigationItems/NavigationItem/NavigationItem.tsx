// @ts-ignore
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = (props: Props): JSX.Element => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
  </li>
);

type Props = {
  active?: boolean;
  children: any;
  exact?: boolean;
  link: string;
};

export default navigationItem;
