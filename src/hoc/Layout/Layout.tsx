import React, { useState } from 'react';
import { connect } from 'react-redux';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';

interface IProps {
  children: any;
  isAuthenticated: boolean;
}

const layout: React.FC<IProps> = ({ children, isAuthenticated }) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = (): void => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = (): void => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Auxiliary>
      <Toolbar
        drawerToggleClicked={sideDrawerToggleHandler}
        isAuth={isAuthenticated}
      />
      <SideDrawer
        closed={sideDrawerClosedHandler}
        isAuth={isAuthenticated}
        open={sideDrawerIsVisible}
      />
      <main className={classes.Content}>{children}</main>
    </Auxiliary>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(layout);
