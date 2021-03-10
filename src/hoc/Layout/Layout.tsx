// @ts-ignore false-error
import React, { Component } from 'react';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';

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

type Props = {
  children: any;
};

export default Layout;
