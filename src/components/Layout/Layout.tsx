// @ts-ignore false-error
import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

type Props = {
  children: any;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
class Layout extends Component<Props> {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = (): void => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = (): void => {
    // inverting current state not recommended due to async
    this.setState((prevState: { showSideDrawer: boolean }) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render(): JSX.Element {
    return (
      <Auxiliary>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
