import PropTypes from 'prop-types';
// @ts-ignore false-error
import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
class Layout extends Component {
  static propTypes: {
    children: PropTypes.Validator<
      | string
      | number
      | boolean
      // eslint-disable-next-line @typescript-eslint/ban-types
      | {}
      | PropTypes.ReactElementLike
      | PropTypes.ReactNodeArray
    >;
  };

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
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;
