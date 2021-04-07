// @ts-ignore
import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

interface IProps {
  closed(): void;
  isAuth: boolean;
  open: boolean;
}

const sideDrawer = (props: IProps): JSX.Element => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) attachedClasses = [classes.SideDrawer, classes.Open];

  return (
    <Auxiliary>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;
