// @ts-ignore
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

interface IProps {
  active?: boolean;
  children: any;
  exact?: boolean;
  link: string;
}

const navigationItem = (props: IProps): JSX.Element => (
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

export default navigationItem;
