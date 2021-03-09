// @ts-ignore false-error
import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const layout = (props: any): JSX.Element => {
  return (
    <Auxiliary>
      <Toolbar />
      <SideDrawer />
      <div>Backdrop</div>
      <main className={classes.Content}>{props.children}</main>
    </Auxiliary>
  );
};

export default layout;
