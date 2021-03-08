// @ts-ignore false-error
import React from 'react';

import classes from './Layout.module.css';
import Auxiliary from '../../hoc/Auxiliary';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const layout = (props: any) => (
  <Auxiliary>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Auxiliary>
);

export default layout;
