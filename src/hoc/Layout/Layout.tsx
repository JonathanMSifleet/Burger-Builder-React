// @ts-ignore false-error
import React, { Component } from 'react';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';

interface IProps {
  children: any;
}

class Layout extends Component<IProps> {
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
